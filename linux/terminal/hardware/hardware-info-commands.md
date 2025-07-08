# hardware info commands

## lsusb
Display information about USB buses and devices connected to them.
More information: <https://manned.org/lsusb>.

List all the USB devices available:

    lsusb

List the USB hierarchy as a tree:

    lsusb [-t|--tree]

List verbose information about USB devices:

    lsusb [-v|--verbose]

List detailed information about a USB device:

    lsusb [-v|--verbose] -s bus:device number

List devices with a specified vendor and product ID only:

    lsusb -d vendor:product

`watch -d lsusb` - следить за изменениями в подключенных usb устройствах

## lspci
List all PCI devices.
More information: <https://manned.org/lspci>.

Show a brief list of devices:

    lspci

Display additional info:

    lspci -v

Display drivers and modules handling each device:

    lspci -k

Show a specific device:

    lspci -s 00:18.3

Dump info in a readable form:

    lspci -vm

## lshw
List detailed information about hardware configurations as root user.
More information: <https://ezix.org/project/wiki/HardwareLiSter>.

Launch the X11 GUI (if available):

    sudo lshw -X

List all hardware in tabular format:

    sudo lshw -short

List multiple class of hardware (all disks and storage controllers) in tabular format:

    sudo lshw [-c|-class] disk [-c|-class] storage -short

Save all network interfaces to an HTML/XML/JSON file:

    sudo lshw [-c|-class] network -html|xml|json > interfaces.html|.xml|.json

List network interfaces without revealing sensitive information (IP addresses, serial numbers, etc.):

    sudo lshw [-c|-class] network -sanitize

List a particular class of hardware:

    sudo lshw [-c|-class] system|bridge|memory|processor|address|storage|disk|tape|bus|network|display|input|printer|multimedia|communication|power|volume|generic

## lscpu
Display information about the CPU architecture.
More information: <https://manned.org/lscpu>.

Display information about all CPUs:

    lscpu

Display information in a table:

    lscpu [-e|--extended]

Display only information about online CPUs in a table:

    lscpu [-e|--extended] [-b|--online]

Display only information about offline CPUs in a table:

    lscpu [-e|--extended] [-c|--offline]

Display details about CPU caches:

    lscpu [-C|--caches]

Display information in JSON format:

    lscpu [-J|--json]

## lsblk
List information about devices.
More information: <https://manned.org/lsblk>.

List all storage devices in a tree-like format:

    lsblk

Also list empty devices:

    lsblk [-a|--all]

Print the SIZE column in bytes rather than in a human-readable format:

    lsblk [-b|--bytes]

Output info about filesystems:

    lsblk [-f|--fs]

Use ASCII characters for tree formatting:

    lsblk [-i|--ascii]

Output info about block-device topology:

    lsblk [-t|--topology]

Exclude the devices specified by the comma-separated list of major device numbers:

    lsblk [-e|--exclude] 1,7,...

Display a customized summary using a comma-separated list of columns:

    lsblk [-o|--output] NAME,SERIAL,MODEL,TRAN,TYPE,SIZE,FSTYPE,MOUNTPOINT,...

