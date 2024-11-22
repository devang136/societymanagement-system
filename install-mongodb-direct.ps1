# Create temporary directory for download
$tempDir = "C:\mongodb-temp"
New-Item -ItemType Directory -Force -Path $tempDir

# Download MongoDB zip file
$url = "https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-6.0.12.zip"
$zipFile = "$tempDir\mongodb.zip"
Write-Host "Downloading MongoDB..."
Invoke-WebRequest -Uri $url -OutFile $zipFile

# Create MongoDB directory
$mongoDBDir = "C:\mongodb"
New-Item -ItemType Directory -Force -Path $mongoDBDir

# Extract MongoDB
Write-Host "Extracting MongoDB..."
Expand-Archive -Path $zipFile -DestinationPath $mongoDBDir -Force

# Create data directory
$dataPath = "C:\data\db"
New-Item -ItemType Directory -Force -Path $dataPath

# Create MongoDB configuration file
$configContent = @"
systemLog:
   destination: file
   path: C:\data\mongod.log
   logAppend: true
storage:
   dbPath: C:\data\db
net:
   bindIp: 127.0.0.1
   port: 27017
"@

$configContent | Out-File -FilePath "C:\mongodb\mongod.cfg" -Encoding UTF8

Write-Host "MongoDB setup completed!"
Write-Host "MongoDB directory: $mongoDBDir"
Write-Host "Data directory: $dataPath"
Write-Host "Config file: C:\mongodb\mongod.cfg"

# Clean up
Remove-Item -Path $tempDir -Recurse -Force
