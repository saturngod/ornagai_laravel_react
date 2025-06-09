DICT_NAME = "Ornagai"
DICT_SRC_PATH = dictionary.xml
CSS_PATH = dictionary.css
PLIST_PATH = Info.plist

DICT_BUILD_OPTS = 

# The dictionary development kit is located at:
# /Applications/Xcode.app/Contents/Developer/Extras/Dictionary Development Kit/
DICT_DEV_KIT_OBJ_DIR = /Applications/Utilities/Extra/DictKit/bin

all:
	"$(DICT_DEV_KIT_OBJ_DIR)/build_dict.sh" $(DICT_BUILD_OPTS) $(DICT_NAME) $(DICT_SRC_PATH) $(CSS_PATH) $(PLIST_PATH)
	echo "Done building dictionary"

install:
	echo "Installing dictionary..."
	mkdir -p ~/Library/Dictionaries
	cp -R objects/$(DICT_NAME).dictionary ~/Library/Dictionaries/
	echo "Installed dictionary to ~/Library/Dictionaries/"

clean:
	rm -rf objects

uninstall:
	rm -rf ~/Library/Dictionaries/$(DICT_NAME).dictionary