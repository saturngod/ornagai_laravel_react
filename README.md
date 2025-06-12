# Ornagai Dictionary

English to Myanmar / Myanmar to English bilingual dictionary application built with Laravel and React.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![PHP](https://img.shields.io/badge/PHP-8.3%2B-blue.svg)
![Laravel](https://img.shields.io/badge/Laravel-12.x-red.svg)
![React](https://img.shields.io/badge/React-18.x-blue.svg)

## ⚠️ Source Code Only

This repository contains only the source code. **Dictionary data is not included** and must be imported separately.

## 🚀 Features

- **Bilingual Search**: English to Myanmar and Myanmar to English
- **Web Interface**: Modern React-based search interface with dark mode support
- **Dictionary Export**: Generate Mac Dictionary and Kindle Dictionary formats
- **Voice Pronunciation**: Text-to-speech for English words and examples
- **Responsive Design**: Mobile-friendly interface with optimized search

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/ornagai.git
cd ornagai
```

2. Install PHP dependencies:
```bash
composer install
```

3. Install Node.js dependencies:
```bash
npm install
```

4. Configure environment:
```bash
cp .env.example .env
php artisan key:generate
```

5. Set up database and run migrations:
```bash
php artisan migrate
```

6. Build frontend assets:
```bash
npm run build
```

## 📚 Dictionary Generation

### Apple Dictionary (Mac)

Generate XML format for Apple Dictionary:

```bash
php artisan app:apple-dictionary --output=dictionary.xml
```

The command generates `dictionary.xml` in `storage/app/`. To create the final `.dictionary` package:

1. Navigate to `tools/apple-dictionary/`
2. Copy generated `dictionary.xml` to this directory
3. Run the build process:
```bash
cd tools/apple-dictionary/
make all
make install
```

**Requirements**: Xcode Dictionary Development Kit

### Kindle Dictionary

Generate HTML format for Kindle:

```bash
php artisan app:kindle-dictionary --output=dictionary.html
```

This generates multiple HTML files (`content_part_1.html` through `content_part_38.html`) in `storage/app/public/`. 

To create the final Kindle dictionary:

1. Navigate to `tools/kindle-dictionary/`
2. Copy generated HTML files to this directory
3. Follow Kindle dictionary packaging instructions

## 🗂️ Project Structure

```
ornagai/
├── app/
│   ├── Console/Commands/          # Dictionary generation commands
│   ├── Http/Controllers/          # Web controllers
│   ├── Models/                    # Eloquent models
│   └── Services/                  # Business logic services
├── resources/
│   ├── js/                        # React frontend
│   └── views/                     # Blade templates
├── tools/
│   ├── apple-dictionary/          # Mac Dictionary build tools
│   └── kindle-dictionary/         # Kindle Dictionary build tools
└── storage/app/public/            # Generated dictionary files
```

## 🔧 Development

Start the development server:

```bash
# Backend (Laravel)
php artisan serve

# Frontend (Vite)
npm run dev
```

## 📖 API Endpoints

- `GET /` - Home page with download links
- `GET /search?q={query}` - Search dictionary entries

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Dictionary data sources and contributors
- Laravel and React communities
- Myanmar language technology supporters