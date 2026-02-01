# WebP Image Optimization Script
# Re-compresses images with optimal settings for web delivery

Write-Host "=== WebP Image Optimization ===" -ForegroundColor Cyan
Write-Host ""

# Setup paths
$sourceDir = "public/images-high-quality-black-bg"
$targetDir = "public/images-optimized"

# Create output directory if it doesn't exist
if (-not (Test-Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir | Out-Null
    Write-Host "Created output directory: $targetDir" -ForegroundColor Green
} else {
    Write-Host "Output directory already exists: $targetDir" -ForegroundColor Yellow
}

# Get all WebP files
$images = Get-ChildItem -Path $sourceDir -Filter "*.webp"
$totalImages = $images.Count
$currentIndex = 0
$totalOriginalSize = 0
$totalOptimizedSize = 0

Write-Host "Found $totalImages images to optimize" -ForegroundColor Cyan
Write-Host "Settings: Quality 75, Method 6, Multi-threading enabled" -ForegroundColor Gray
Write-Host ""

# Process each image
foreach ($image in $images) {
    $currentIndex++
    $inputPath = $image.FullName
    $outputPath = Join-Path $targetDir $image.Name
    
    # Get original file size
    $originalSize = (Get-Item $inputPath).Length
    $totalOriginalSize += $originalSize
    
    # Show progress
    $percent = [math]::Round(($currentIndex / $totalImages) * 100)
    Write-Host "[$currentIndex/$totalImages] $($image.Name) " -NoNewline -ForegroundColor White
    
    # Run cwebp
    & .\cwebp.exe -q 75 -m 6 -mt "$inputPath" -o "$outputPath" 2>&1 | Out-Null
    
    if ($LASTEXITCODE -eq 0) {
        # Get optimized file size
        $optimizedSize = (Get-Item $outputPath).Length
        $totalOptimizedSize += $optimizedSize
        
        $savings = [math]::Round((($originalSize - $optimizedSize) / $originalSize) * 100, 1)
        $originalKB = [math]::Round($originalSize / 1KB, 1)
        $optimizedKB = [math]::Round($optimizedSize / 1KB, 1)
        
        Write-Host "OK " -ForegroundColor Green -NoNewline
        Write-Host "$originalKB KB to $optimizedKB KB (-$savings%)" -ForegroundColor Gray
    } else {
        Write-Host "FAILED" -ForegroundColor Red
    }
}

# Summary
Write-Host ""
Write-Host "=== Optimization Complete ===" -ForegroundColor Cyan
$totalSavings = [math]::Round((($totalOriginalSize - $totalOptimizedSize) / $totalOriginalSize) * 100, 1)
$totalOriginalMB = [math]::Round($totalOriginalSize / 1MB, 2)
$totalOptimizedMB = [math]::Round($totalOptimizedSize / 1MB, 2)
$savedMB = [math]::Round(($totalOriginalSize - $totalOptimizedSize) / 1MB, 2)

Write-Host "Original total:  $totalOriginalMB MB" -ForegroundColor White
Write-Host "Optimized total: $totalOptimizedMB MB" -ForegroundColor Green
Write-Host "Saved:           $savedMB MB (-$totalSavings%)" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next step: Update GiftScroll.tsx to use /images-optimized/ path" -ForegroundColor Yellow
