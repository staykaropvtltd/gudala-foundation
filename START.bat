@echo off
echo Starting Gudala Family Foundation Website...
echo.
set DATABASE_URL=file:./gundala.db
set JWT_SECRET=gudala-foundation-super-secret-jwt-key-change-in-production-2024
set NEXT_PUBLIC_SITE_URL=http://localhost:3000
echo Visit: http://localhost:3000
echo Admin:  http://localhost:3000/admin
echo Login:  admin@gudalafoundation.org / Admin@GFF2024
echo.
npm run dev
