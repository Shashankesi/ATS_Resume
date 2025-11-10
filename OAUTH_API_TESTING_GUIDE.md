# 🧪 OAuth API Testing Guide

## Quick Test Commands

### 1. Google OAuth Preview

```bash
# Test Google account preview endpoint
curl -X POST http://localhost:5000/api/auth/google/preview \
  -H "Content-Type: application/json" \
  -d '{}'

# Expected Response (200 OK):
{
  "provider": "google",
  "name": "Google Account User",
  "email": "user-1234567890@gmail.com",
  "scope": ["profile", "email"],
  "verified": true,
  "preview": true
}
```

### 2. GitHub OAuth Preview

```bash
# Test GitHub account preview endpoint
curl -X POST http://localhost:5000/api/auth/github/preview \
  -H "Content-Type: application/json" \
  -d '{}'

# Expected Response (200 OK):
{
  "provider": "github",
  "name": "GitHub Developer",
  "email": "github-1234567890@smartcareer.com",
  "scope": ["user:email", "read:user"],
  "verified": true,
  "preview": true
}
```

### 3. Microsoft OAuth Preview

```bash
# Test Microsoft account preview endpoint
curl -X POST http://localhost:5000/api/auth/microsoft/preview \
  -H "Content-Type: application/json" \
  -d '{}'

# Expected Response (200 OK):
{
  "provider": "microsoft",
  "name": "Microsoft Account",
  "email": "microsoft-1234567890@outlook.com",
  "scope": ["profile", "email"],
  "verified": true,
  "preview": true
}
```

---

## Full OAuth Sign-In Flow

### 1. Step 1: Get Account Preview

```bash
# Frontend calls preview endpoint when user clicks OAuth button
curl -X POST http://localhost:5000/api/auth/google/preview \
  -H "Content-Type: application/json" \
  -d '{}'

# Backend returns account info
# Frontend shows modal with account details
```

### 2. Step 2: User Confirms Sign-In

```bash
# After user clicks "Allow Access"
# Frontend calls actual sign-in endpoint
curl -X POST http://localhost:5000/api/auth/google \
  -H "Content-Type: application/json" \
  -d '{}'

# Expected Response (201 Created):
{
  "_id": "user_id_12345",
  "name": "Test User",
  "email": "test@gmail.com",
  "role": "user",
  "photo": "",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Signed in successfully"
}
```

### 3. Step 3: Use Access Token

```bash
# Frontend stores token and uses it for authenticated requests
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"

# Expected Response (200 OK):
{
  "_id": "user_id_12345",
  "name": "Test User",
  "email": "test@gmail.com",
  "role": "user",
  "photo": "",
  "headline": "",
  "location": ""
}
```

---

## PowerShell Testing Commands

### Google OAuth Preview (PowerShell)

```powershell
$uri = "http://localhost:5000/api/auth/google/preview"
$body = @{} | ConvertTo-Json

$response = Invoke-WebRequest -Uri $uri -Method POST `
  -ContentType "application/json" `
  -Body $body

$response.Content | ConvertFrom-Json
```

### GitHub OAuth Preview (PowerShell)

```powershell
$uri = "http://localhost:5000/api/auth/github/preview"
$body = @{} | ConvertTo-Json

$response = Invoke-WebRequest -Uri $uri -Method POST `
  -ContentType "application/json" `
  -Body $body

$response.Content | ConvertFrom-Json
```

### Microsoft OAuth Preview (PowerShell)

```powershell
$uri = "http://localhost:5000/api/auth/microsoft/preview"
$body = @{} | ConvertTo-Json

$response = Invoke-WebRequest -Uri $uri -Method POST `
  -ContentType "application/json" `
  -Body $body

$response.Content | ConvertFrom-Json
```

### Full Sign-In Flow (PowerShell)

```powershell
# Step 1: Get preview
$previewUri = "http://localhost:5000/api/auth/google/preview"
$previewResponse = Invoke-WebRequest -Uri $previewUri -Method POST `
  -ContentType "application/json" `
  -Body @{} | ConvertFrom-Json

Write-Host "Preview Data:"
$previewResponse | ConvertTo-Json

# Step 2: Sign in
$signInUri = "http://localhost:5000/api/auth/google"
$signInResponse = Invoke-WebRequest -Uri $signInUri -Method POST `
  -ContentType "application/json" `
  -Body @{} | ConvertFrom-Json

Write-Host "`nSign-In Response:"
$signInResponse | ConvertTo-Json

# Step 3: Use token
$token = $signInResponse.token
$headers = @{
  "Authorization" = "Bearer $token"
  "Content-Type" = "application/json"
}

$meUri = "http://localhost:5000/api/auth/me"
$meResponse = Invoke-WebRequest -Uri $meUri -Method GET `
  -Headers $headers | ConvertFrom-Json

Write-Host "`nUser Data:"
$meResponse | ConvertTo-Json
```

---

## JavaScript Testing (Browser Console)

### Google OAuth Preview

```javascript
const response = await fetch('http://localhost:5000/api/auth/google/preview', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({})
});

const data = await response.json();
console.log('Google Preview:', data);
```

### GitHub OAuth Preview

```javascript
const response = await fetch('http://localhost:5000/api/auth/github/preview', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({})
});

const data = await response.json();
console.log('GitHub Preview:', data);
```

### Microsoft OAuth Preview

```javascript
const response = await fetch('http://localhost:5000/api/auth/microsoft/preview', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({})
});

const data = await response.json();
console.log('Microsoft Preview:', data);
```

### Full OAuth Flow

```javascript
// Step 1: Get preview
const preview = await fetch('http://localhost:5000/api/auth/google/preview', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({})
}).then(r => r.json());

console.log('Account to authorize:', preview);

// Step 2: Sign in
const signIn = await fetch('http://localhost:5000/api/auth/google', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({})
}).then(r => r.json());

console.log('Signed in:', signIn);

// Step 3: Verify with me endpoint
const me = await fetch('http://localhost:5000/api/auth/me', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${signIn.token}`,
    'Content-Type': 'application/json'
  }
}).then(r => r.json());

console.log('Current user:', me);
```

---

## Expected Responses

### 200 OK - Preview Success

```json
{
  "provider": "google",
  "name": "Google Account User",
  "email": "user-1234567890@gmail.com",
  "scope": ["profile", "email"],
  "verified": true,
  "preview": true
}
```

### 201 Created - Sign-In Success

```json
{
  "_id": "user_id_12345",
  "name": "Test User",
  "email": "test@gmail.com",
  "role": "user",
  "photo": "",
  "token": "jwt_token_here",
  "refreshToken": "refresh_token_here",
  "message": "Signed in successfully"
}
```

### 400 Bad Request - Invalid Data

```json
{
  "message": "Invalid request data",
  "error": "Details about the error"
}
```

### 429 Too Many Requests - Rate Limited

```json
{
  "message": "Too many requests, please try again later"
}
```

### 500 Internal Server Error

```json
{
  "message": "Server error occurred",
  "error": "Error details"
}
```

---

## Integration with Postman

### Setup Collection

1. **Create New Collection**: "SmartCareer OAuth"
2. **Add Environment Variables**:
   ```
   base_url: http://localhost:5000/api
   token: (will be set after sign-in)
   ```

### Create Requests

#### 1. Google Preview
- Method: POST
- URL: {{base_url}}/auth/google/preview
- Body: {} (raw JSON)

#### 2. Google Sign-In
- Method: POST
- URL: {{base_url}}/auth/google
- Body: {} (raw JSON)
- Tests:
  ```javascript
  const jsonData = pm.response.json();
  pm.environment.set("token", jsonData.token);
  ```

#### 3. Get Current User
- Method: GET
- URL: {{base_url}}/auth/me
- Headers:
  - Authorization: Bearer {{token}}
  - Content-Type: application/json

---

## Debugging

### Check Backend Logs

```bash
# Terminal output should show:
✅ Firebase Admin SDK Initialized
✅ Gemini API Initialized
🚀 Server running on port 5000
✅ MongoDB Connected
```

### Check API Call Logs

When preview endpoint is called:
```
POST /api/auth/google/preview 200 OK
POST /api/auth/github/preview 200 OK
POST /api/auth/microsoft/preview 200 OK
```

When sign-in is called:
```
POST /api/auth/google 201 Created
✅ New user created via Google Sign-In: test@gmail.com
```

### Check Browser Console

```javascript
// Should see network requests:
POST /api/auth/google/preview
POST /api/auth/google
GET /api/auth/me

// Should see responses logged
```

---

## Manual Testing Steps

1. **Start Servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm start

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

2. **Open Application**
   ```
   http://localhost:5173
   ```

3. **Go to Login Page**
   - Click the login link
   - Or direct: http://localhost:5173/login

4. **Test Google OAuth**
   - Click "Continue with Google"
   - Modal should appear
   - Click "Allow Access"
   - Should be logged in

5. **Test GitHub OAuth**
   - Logout first
   - Click "GitHub"
   - Modal should appear
   - Click "Allow Access"
   - Should be logged in

6. **Test Microsoft OAuth**
   - Logout first
   - Click "Microsoft"
   - Modal should appear
   - Click "Allow Access"
   - Should be logged in

7. **Verify in Database**
   ```bash
   # Check MongoDB Atlas
   Database: smartcareer_db
   Collection: users
   
   Should see 3 new users:
   - google-xxx@gmail.com
   - github-xxx@smartcareer.com
   - microsoft-xxx@outlook.com
   ```

---

## Performance Metrics

### Expected Response Times
- Preview endpoint: < 50ms
- Sign-in endpoint: < 100ms
- Me endpoint: < 50ms

### Rate Limits
- Preview: 100 per 15 minutes per IP
- Sign-in: 5 per 15 minutes per IP

### Success Rate
- Expected: 99.9%
- Should only fail if MongoDB is down

---

## Troubleshooting

### Preview returns 500 error
1. Check MongoDB connection
2. Check backend logs
3. Restart backend server

### Token not working with me endpoint
1. Make sure Authorization header is set
2. Check token format (Bearer {token})
3. Verify token hasn't expired

### Modal not appearing
1. Check browser console for errors
2. Verify OAuthModal component imported
3. Check state management

### Sign-in fails after confirmation
1. Check network tab in DevTools
2. Check backend console for errors
3. Try different OAuth provider
4. Try email/password login

---

## Success Indicators

✅ **All tests passing when you see:**
1. Preview endpoints return correct data
2. Sign-in endpoints create users
3. Tokens are valid and usable
4. Me endpoint returns user data
5. Users appear in MongoDB
6. Modal shows account info
7. Users can login and access dashboard

---

**Everything ready for testing! 🚀**

