@echo off
echo =========================================
echo  Gudala Family Foundation - First Setup
echo =========================================
echo.
echo Step 1: Installing dependencies...
call npm install
echo.
echo Step 2: Creating database...
set DATABASE_URL=file:./gundala.db
call npx prisma db push
echo.
echo Step 3: Seeding database...
call node prisma/seed.js
echo.
echo =========================================
echo  Setup Complete!
echo =========================================
echo.
echo Admin Login:
echo   Email:    admin@gudalafoundation.org
echo   Password: Admin@GFF2024
echo.
echo Run START.bat to launch the website.
echo.
pause
