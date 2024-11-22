# Download MongoDB
$mongoDbVersion = "7.0.2"
$downloadUrl = "https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-7.0.2-signed.msi"
$installerPath = "$env:TEMP\mongodb-installer.msi"

Write-Host "Downloading MongoDB..."
Invoke-WebRequest -Uri $downloadUrl -OutFile $installerPath

# Install MongoDB
Write-Host "Installing MongoDB..."
Start-Process msiexec.exe -Wait -ArgumentList "/i `"$installerPath`" /quiet /qn /norestart"

# Create data directory
$dataPath = "C:\data\db"
if (-not (Test-Path -Path $dataPath)) {
    New-Item -ItemType Directory -Path $dataPath -Force
}

Write-Host "MongoDB installation completed!"
Write-Host "Data directory created at: $dataPath"
