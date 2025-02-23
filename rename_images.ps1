# Get all PNG files in the current directory
$files = Get-ChildItem *.png

# Counter for new filenames
$counter = 1

# Rename each file
foreach ($file in $files) {
    $newName = "image$counter.png"
    Rename-Item $file.FullName -NewName $newName
    Write-Host "Renamed $($file.Name) to $newName"
    $counter++
} 