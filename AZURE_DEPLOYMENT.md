# Azure Deployment Guide

## Overview
This guide will help you deploy the Buyer Information Management System to Azure.

## Architecture
- **Database**: Azure Database for PostgreSQL Flexible Server
- **Backend**: Azure App Service (Java 21)
- **Frontend**: Azure Static Web Apps (React)

---

## Prerequisites
✅ Azure account (create at portal.azure.com)
✅ Code pushed to GitHub
✅ Azure CLI installed (optional)

---

## Step 1: Create Azure Database for PostgreSQL

1. Go to [Azure Portal](https://portal.azure.com)
2. Click **"Create a resource"** → Search **"Azure Database for PostgreSQL"**
3. Select **"Flexible Server"**
4. Configure:
   - **Resource Group**: `buyer-info-rg` (create new)
   - **Server name**: `buyer-info-db-server` (must be globally unique)
   - **Region**: Choose nearest location
   - **PostgreSQL version**: 15 or 16
   - **Workload type**: Development
   - **Compute + storage**: Burstable, B1ms (1 vCore, 2 GiB RAM)
   - **Admin username**: `adminuser`
   - **Password**: Create strong password and **save it**

5. **Networking** tab:
   - Select **"Public access (allowed IP addresses)"**
   - Check **"Allow public access from any Azure service within Azure to this server"**

6. Click **"Review + Create"** → **"Create"**

7. After deployment, create database:
   - Go to your PostgreSQL server → **Databases**
   - Click **"+ Add"** → Name: `buyer_info_db`

**Save these values:**
```
Server: buyer-info-db-server.postgres.database.azure.com
Database: buyer_info_db
Username: adminuser
Password: [your-password]
Port: 5432
```

---

## Step 2: Create Azure App Service (Backend)

### Option A: Manual Deployment

1. Click **"Create a resource"** → **"Web App"**
2. Configure:
   - **Resource Group**: Use existing `buyer-info-rg`
   - **Name**: `buyer-info-api` (must be unique, becomes buyer-info-api.azurewebsites.net)
   - **Publish**: Code
   - **Runtime stack**: Java 21
   - **Java web server stack**: Java SE (Embedded Web Server)
   - **Operating System**: Linux
   - **Region**: Same as database
   - **Pricing Plan**: Basic B1 or Free F1

3. Click **"Review + Create"** → **"Create"**

4. Configure Application Settings:
   - Go to App Service → **Configuration** → **Application settings**
   - Click **"+ New application setting"** for each:

   ```
   Name: SPRING_DATASOURCE_URL
   Value: jdbc:postgresql://buyer-info-db-server.postgres.database.azure.com:5432/buyer_info_db?sslmode=require

   Name: SPRING_DATASOURCE_USERNAME
   Value: adminuser

   Name: SPRING_DATASOURCE_PASSWORD
   Value: [your-database-password]

   Name: SPRING_JPA_HIBERNATE_DDL_AUTO
   Value: update

   Name: SPRING_JPA_SHOW_SQL
   Value: false

   Name: SERVER_PORT
   Value: 8080
   ```

   - Click **"Save"**

5. **Deploy JAR file**:
   ```powershell
   # Build JAR
   cd buyer-info-api
   .\mvnw.cmd clean package -DskipTests

   # Deploy via Azure CLI (install first: https://aka.ms/installazurecliwindows)
   az login
   az webapp deploy --resource-group buyer-info-rg --name buyer-info-api --src-path target/testproject-0.0.1-SNAPSHOT.jar --type jar
   ```

### Option B: GitHub Actions (Automated)

1. In Azure Portal, go to your App Service → **Deployment Center**
2. Select **GitHub** as source
3. Authorize GitHub access
4. Select:
   - **Organization**: Your GitHub username
   - **Repository**: Your repository
   - **Branch**: main or master
5. Azure automatically creates a workflow file

6. Get the publish profile:
   - App Service → **Overview** → **Get publish profile** (download)
   - Open the file and copy all content

7. Add to GitHub Secrets:
   - Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions**
   - Click **"New repository secret"**
   - Name: `AZURE_WEBAPP_PUBLISH_PROFILE`
   - Value: Paste the publish profile content
   - Click **"Add secret"**

8. Update workflow file: `.github/workflows/azure-deploy-backend.yml`
   - Change `AZURE_WEBAPP_NAME` to your actual app service name

9. Push changes to GitHub:
   ```powershell
   git add .
   git commit -m "Add Azure deployment workflow"
   git push
   ```

**Backend URL**: `https://buyer-info-api.azurewebsites.net`

---

## Step 3: Create Azure Static Web App (Frontend)

1. Click **"Create a resource"** → Search **"Static Web App"**
2. Configure:
   - **Resource Group**: Use existing `buyer-info-rg`
   - **Name**: `buyer-info-web`
   - **Plan type**: Free
   - **Region**: Choose nearest (automatic)
   - **Source**: GitHub
   - Sign in and authorize

3. **Deployment details**:
   - **Organization**: Your GitHub username
   - **Repository**: Your repository
   - **Branch**: main or master
   - **Build Presets**: React
   - **App location**: `/buyer-info-web`
   - **Api location**: (leave empty)
   - **Output location**: `dist`

4. Click **"Review + Create"** → **"Create"**

5. After deployment:
   - Go to Static Web App → **Overview**
   - Copy the URL (e.g., `https://buyer-info-web.azurestaticapps.net`)

6. **Update Backend CORS**:
   - Edit `buyer-info-api/src/main/java/coding/contest/testproject/config/CorsConfig.java`
   - Add your Static Web App URL to allowed origins:
   ```java
   corsConfiguration.setAllowedOrigins(Arrays.asList(
       "http://localhost:5173",
       "https://buyer-info-web.azurestaticapps.net"  // Add this
   ));
   ```
   - Commit and push changes

7. **Update Frontend API URL**:
   - Edit `buyer-info-web/.env.production`
   - Update with your backend URL:
   ```
   VITE_API_URL=https://buyer-info-api.azurewebsites.net
   ```
   - Commit and push changes

---

## Step 4: Verify Deployment

### Backend Health Check
Visit: `https://buyer-info-api.azurewebsites.net/api/buyer-info`

Should return: Empty array `[]` or list of buyers

### Frontend Check
Visit: `https://buyer-info-web.azurestaticapps.net`

Should see: Your Buyer Information application

---

## Step 5: Test the Application

1. Open your frontend URL
2. Click "Add Buyer Information"
3. Fill in the form and submit
4. Check if buyer appears in the list
5. Try deleting a buyer

---

## Troubleshooting

### Backend Issues

**500 Internal Server Error**:
- Check App Service → **Log stream** for errors
- Verify database connection settings
- Ensure PostgreSQL allows Azure services

**CORS Errors**:
- Verify frontend URL is in allowed origins
- Check CORS configuration is deployed

**Database Connection Failed**:
- Verify connection string format includes `?sslmode=require`
- Check PostgreSQL firewall rules
- Confirm database exists

### Frontend Issues

**Cannot connect to backend**:
- Verify `VITE_API_URL` in `.env.production`
- Check backend CORS includes frontend URL
- Open browser console for error details

**Static Web App build failed**:
- Check GitHub Actions workflow logs
- Verify `app_location` is `/buyer-info-web`
- Verify `output_location` is `dist`

---

## Cost Optimization

### Free Tier Options
- **PostgreSQL**: Burstable B1ms ~$12-15/month (no free tier)
- **App Service**: F1 Free tier available (limitations apply)
- **Static Web App**: Free tier (100 GB bandwidth/month)

### Estimated Monthly Cost
- **Development**: ~$15-20/month
- **Production**: ~$50-100/month depending on usage

---

## Next Steps

1. ✅ Set up custom domain (optional)
2. ✅ Add SSL certificate (automatic with Azure)
3. ✅ Set up monitoring and alerts
4. ✅ Configure CI/CD for automatic deployments
5. ✅ Add application insights for logging
6. ✅ Set up staging environment

---

## Useful Commands

### Azure CLI
```powershell
# Login
az login

# List resource groups
az group list --output table

# View app service logs
az webapp log tail --name buyer-info-api --resource-group buyer-info-rg

# Restart app service
az webapp restart --name buyer-info-api --resource-group buyer-info-rg

# View static web app
az staticwebapp show --name buyer-info-web --resource-group buyer-info-rg
```

### Git
```powershell
# Push changes to trigger deployment
git add .
git commit -m "Update configuration"
git push origin main
```

---

## Support Resources

- [Azure Documentation](https://docs.microsoft.com/azure)
- [Azure Portal](https://portal.azure.com)
- [Azure Status](https://status.azure.com)
- [Pricing Calculator](https://azure.microsoft.com/pricing/calculator)

---

## Quick Reference

| Service | Name | URL |
|---------|------|-----|
| Database | buyer-info-db-server | buyer-info-db-server.postgres.database.azure.com:5432 |
| Backend | buyer-info-api | https://buyer-info-api.azurewebsites.net |
| Frontend | buyer-info-web | https://buyer-info-web.azurestaticapps.net |
| Resource Group | buyer-info-rg | - |

---

**Good luck with your deployment! 🚀**
