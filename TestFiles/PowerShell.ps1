# Code for PowerShell to format
    $disk = Get-Disk `
-UniqueId $A `
    -ErrorAction SilentlyContinue
$disk

# Code for Unicode Substitutions to format
Write—Output “Contains an Em dash, Start Double Quotes and End Double Quotes.”
Write–Output ‘Contains an En dash, Start Quotes and End Quotes.’
Write―Output ‘Contains a Horizontal Bar, Start Quotes and End Quotes.’