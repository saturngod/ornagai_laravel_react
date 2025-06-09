<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\EnglishWord;
use Illuminate\Support\Facades\Storage;

class AppleDictionary extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:apple-dictionary {--output=dictionary.xml : Output file name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate Apple Dictionary XML format from EnglishWord data';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting Apple Dictionary XML generation...');
        
        $outputFile = $this->option('output');
        $chunkSize = 100; // Process 100 words at a time
        
        // Get total count for progress bar
        $totalWords = EnglishWord::count();
        $this->info("Processing {$totalWords} words in chunks of {$chunkSize}...");
        
        // Initialize progress bar
        $progressBar = $this->output->createProgressBar($totalWords);
        $progressBar->start();
        
        // Start the XML document and write header to file
        $xmlHeader = $this->generateXmlHeader();
        Storage::disk('local')->put($outputFile, $xmlHeader);
        
        $processedCount = 0;
        
        // Process words in chunks to avoid memory exhaustion
        EnglishWord::with(['wordData.examples'])
            ->chunk($chunkSize, function ($words) use ($outputFile, $progressBar, &$processedCount) {
                $xmlChunk = '';
                
                foreach ($words as $word) {
                    $xmlChunk .= $this->generateWordEntry($word);
                    $progressBar->advance();
                    $processedCount++;
                }
                
                // Append chunk to file
                Storage::disk('local')->append($outputFile, $xmlChunk);
                
                // Clear memory
                unset($xmlChunk);
                gc_collect_cycles();
            });
        
        // Append XML footer
        $xmlFooter = $this->generateXmlFooter();
        Storage::disk('local')->append($outputFile, $xmlFooter);
        
        $progressBar->finish();
        $this->newLine();
        
        $this->info("Dictionary XML generated successfully!");
        $this->info("File saved to: " . storage_path("app/{$outputFile}"));
        $this->info("Total words processed: {$processedCount}");
        
        // Display file size
        $fileSize = Storage::disk('local')->size($outputFile);
        $this->info("File size: " . $this->formatBytes($fileSize));
    }

    /**
     * Generate the XML header
     */
    private function generateXmlHeader(): string
    {
        return '<?xml version="1.0" encoding="UTF-8"?>' . "\n" .
               '<d:dictionary xmlns="http://www.w3.org/1999/xhtml" xmlns:d="http://www.apple.com/DTDs/DictionaryService-1.0.rng">' . "\n\n";
    }

    /**
     * Generate the XML footer
     */
    private function generateXmlFooter(): string
    {
        return "</d:dictionary>\n";
    }

    /**
     * Generate a word entry
     */
    private function generateWordEntry(EnglishWord $word): string
    {
        $entryId = "entry_" . $word->id;
        $wordTitle = htmlspecialchars($word->word, ENT_XML1, 'UTF-8');
        
        $xml = "<d:entry id=\"{$entryId}\" d:title=\"{$wordTitle}\">\n";
        $xml .= "    <d:index d:value=\"" . strtolower($wordTitle) . "\"/>\n";
        $xml .= "    <h1>{$wordTitle}</h1>\n";
        
        // Process each word data (different definitions/parts of speech)
        foreach ($word->wordData as $index => $wordData) {
            if ($index > 0) {
                $xml .= "    <br/>\n";
            }
            
            $xml .= $this->generateWordDataSection($wordData, $index + 1);
        }
        
        $xml .= "</d:entry>\n\n";
        
        return $xml;
    }

    /**
     * Generate a word data section (definition with examples)
     */
    private function generateWordDataSection($wordData, $definitionNumber): string
    {
        $xml = "";
        
        // Part of speech and pronunciation
        $partOfSpeech = $wordData->state ? htmlspecialchars($wordData->state, ENT_XML1, 'UTF-8') : '';
        $ipa = $wordData->ipa ? htmlspecialchars($wordData->ipa, ENT_XML1, 'UTF-8') : '';
        
        if ($partOfSpeech || $ipa) {
            $xml .= "    <p>";
            if ($partOfSpeech) {
                $xml .= "<b>{$partOfSpeech}</b>";
            }
            if ($ipa) {
                $xml .= " /{$ipa}/";
            }
            $xml .= "</p>\n";
        }
        
        // Definition
        if ($wordData->def) {
            $definition = htmlspecialchars($wordData->def, ENT_XML1, 'UTF-8');
            $xml .= "    <p>{$definitionNumber}. {$definition}</p>\n";
        }
        
        // Examples
        if ($wordData->examples && $wordData->examples->count() > 0) {
            foreach ($wordData->examples as $example) {
                $exampleText = htmlspecialchars($example->example, ENT_XML1, 'UTF-8');
                $xml .= "    <p><i>Example:</i> {$exampleText}</p>\n";
            }
        }
        
        return $xml;
    }
    
    /**
     * Format bytes to human readable format
     */
    private function formatBytes($bytes, $precision = 2): string
    {
        $units = array('B', 'KB', 'MB', 'GB', 'TB');
        
        for ($i = 0; $bytes > 1024; $i++) {
            $bytes /= 1024;
        }
        
        return round($bytes, $precision) . ' ' . $units[$i];
    }
}
