param(
    [Parameter(Mandatory=$true)]
    [string]$version
)

# Mostrar versiones disponibles si no se especifica una
if ($version -eq "list") {
    Write-Host "`nVersiones disponibles:"
    Write-Host "-------------------"
    git tag
    Write-Host "`nUso: .\restore-version.ps1 v1.x.x"
    exit 0
}

# Verificar si el tag existe
$tagExists = git tag | Select-String -Pattern "^$version$"
if (-not $tagExists) {
    Write-Host "Error: La versión $version no existe."
    Write-Host "`nVersiones disponibles:"
    git tag
    exit 1
}

# Guardar cambios actuales si existen
$status = git status --porcelain
if ($status) {
    $date = Get-Date -Format "yyyyMMdd_HHmmss"
    $branchName = "backup_$date"
    
    Write-Host "`nGuardando cambios actuales en rama: $branchName"
    git checkout -b $branchName
    git add .
    git commit -m "Backup automático antes de restaurar a $version"
}

# Restaurar a la versión especificada
Write-Host "`nRestaurando a versión: $version"
git checkout $version

Write-Host "`nRestauración completada."
Write-Host "Para volver a la última versión, usa: git checkout master"
if ($status) {
    Write-Host "Tus cambios no guardados están en la rama: $branchName"
} 