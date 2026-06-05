# ThingsBoard API Documentation (Full Audit)

This document provides a comprehensive audit of all API endpoints found in the source code.

## Domain: Admin / Settings

### Get the list of all OAuth2 client registration templates (getMailConfigTemplates)

**Endpoint:** `GET /api/mail/config/template`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `JsonNode`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, mailConfigTemplateService.findAllMailConfigTemplates

#### Dependencies
- TbMailConfigTemplateService

#### Usage Flow
Called by UI: `admin.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get associated android applications (getAssetLinks)

**Endpoint:** `GET /.well-known/assetlinks.json`

#### Purpose
No description provided in source.

#### Authentication
Required: No
Expression: `None`

#### Request

#### Response
- **Success:** `ResponseEntity<JsonNode>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls qrCodeSettingService.findAppFromQrCodeSettings, mobileApp.getStoreInfo, storeInfo.getSha256CertFingerprints, ResponseEntity.ok, JacksonUtil.toJsonNode, String.format, mobileApp.getPkgName, storeInfo.getSha256CertFingerprints, ResponseEntity.notFound

#### Dependencies
- QrCodeSettingService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get associated ios applications (getAppleAppSiteAssociation)

**Endpoint:** `GET /.well-known/apple-app-site-association`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN')`

#### Request

#### Response
- **Success:** `ResponseEntity<JsonNode>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls qrCodeSettingService.findAppFromQrCodeSettings, mobileApp.getStoreInfo, storeInfo.getAppId, ResponseEntity.ok, JacksonUtil.toJsonNode, String.format, storeInfo.getAppId, ResponseEntity.notFound

#### Dependencies
- QrCodeSettingService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Create Or Update the Mobile application settings (saveMobileAppSettings)

**Endpoint:** `POST /api/mobile/qr/settings`

#### Purpose
The request payload contains configuration for android/iOS applications and platform qr code widget settings.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Body Schema:** `QrCodeSettings`

#### Response
- **Success:** `QrCodeSettings`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, qrCodeSettings.setTenantId, qrCodeSettingService.saveQrCodeSettings, currentUser.getTenantId

#### Dependencies
- QrCodeSettingService

#### Usage Flow
Called by UI: `mobile-application.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Mobile application settings (getQrCodeSettings)

**Endpoint:** `GET /api/mobile/qr/settings`

#### Purpose
The response payload contains configuration for android/iOS applications and platform qr code widget settings.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `QrCodeSettings`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, qrCodeSettingService.findQrCodeSettings

#### Dependencies
- QrCodeSettingService

#### Usage Flow
Called by UI: `mobile-application.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get the deep link to the associated mobile application (getMobileAppDeepLink)

**Endpoint:** `GET /api/mobile/qr/deepLink`

#### Purpose
Fetch the url that takes user to linked mobile application

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `String`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls mobileAppSecretService.generateMobileAppSecret, systemSecurityService.getBaseUrl, qrCodeSettingService.findQrCodeSettings, qrCodeSettings.isUseDefaultApp, String.format, appDomain.equals

#### Dependencies
- SystemSecurityService, MobileAppSecretService, QrCodeSettingService

#### Usage Flow
Called by UI: `mobile-application.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get User Token (getUserTokenByMobileSecret)

**Endpoint:** `GET /api/noauth/qr/{secret}`

#### Purpose
Returns the token of the User based on the provided secret key.

#### Authentication
Required: No
Expression: `None`

#### Request

#### Response
- **Success:** `JwtPair`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls mobileAppSecretService.getJwtPair

#### Dependencies
- MobileAppSecretService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getApplicationRedirect

**Endpoint:** `GET /api/noauth/qr`

#### Purpose
No description provided in source.

#### Authentication
Required: No
Expression: `None`

#### Request

#### Response
- **Success:** `ResponseEntity<?>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls qrCodeSettingService.findQrCodeSettings, userAgent.contains, qrCodeSettings.isAndroidEnabled, qrCodeSettings.getGooglePlayLink, ResponseEntity.status, userAgent.contains, userAgent.contains, qrCodeSettings.isIosEnabled, qrCodeSettings.getAppStoreLink, ResponseEntity.status

#### Dependencies
- QrCodeSettingService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Save API key for user (saveApiKey)

**Endpoint:** `POST /api/apiKey`

#### Purpose
Creates an API key for the given user and returns the token ONCE as 'ApiKey {value}'.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN','TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `ApiKey`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls apiKeyInfo.getUserId, apiKeyInfo.setTenantId, user.getTenantId, apiKeyInfo.getId, apiKeyService.saveApiKey, apiKeyInfo.getTenantId, apiKeyInfo.getId, savedApiKey.setValue

#### Dependencies
- ApiKeyService

#### Usage Flow
Called by UI: `api-key.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get User Api Keys (getUserApiKeys)

**Endpoint:** `GET /api/apiKeys/{userId}`

#### Purpose
Returns a page of api keys owned by user.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN','TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `userId` (String) in path
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<ApiKeyInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, apiKeyService.findApiKeysByUserId, user.getTenantId

#### Dependencies
- ApiKeyService

#### Usage Flow
Called by UI: `api-key.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Update API key Description

**Endpoint:** `PUT /api/apiKey/{id}/description`

#### Purpose
Updates the description of the existing API key by apiKeyId.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN','TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `id` (UUID) in path
- **Body Schema:** `Optional<String>`

#### Response
- **Success:** `ApiKeyInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls apiKey.getUserId, apiKey.setDescription, description.orElse, apiKeyService.saveApiKey, apiKey.getTenantId

#### Dependencies
- ApiKeyService

#### Usage Flow
Called by UI: `api-key.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Enable or disable API key (enableApiKey)

**Endpoint:** `PUT /api/apiKey/{id}/enabled/{enabledValue}`

#### Purpose
Updates api key with enabled = true/false.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN','TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `id` (UUID) in path
  - `enabledValue` (Boolean) in path

#### Response
- **Success:** `ApiKeyInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls apiKey.getUserId, apiKey.setEnabled, apiKeyService.saveApiKey, apiKey.getTenantId

#### Dependencies
- ApiKeyService

#### Usage Flow
Called by UI: `api-key.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete API key by ID (deleteApiKey)

**Endpoint:** `DELETE /api/apiKey/{id}`

#### Purpose
Deletes the API key. Referencing non-existing ApiKey Id will cause an error.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN','TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `id` (UUID) in path

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls apiKey.getUserId, apiKeyService.deleteApiKey, apiKey.getTenantId

#### Dependencies
- ApiKeyService

#### Usage Flow
Called by UI: `api-key.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get UI help base url (getHelpBaseUrl)

**Endpoint:** `GET /api/uiSettings/helpBaseUrl`

#### Purpose
Get UI help base url used to fetch help assets.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `String`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `ui-settings.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Create or update OAuth2 client registration template (saveClientRegistrationTemplate)

**Endpoint:** `POST /api/oauth2/config/template`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN')`

#### Request
- **Body Schema:** `OAuth2ClientRegistrationTemplate`

#### Response
- **Success:** `OAuth2ClientRegistrationTemplate`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, oAuth2ConfigTemplateService.saveClientRegistrationTemplate

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `oauth2.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete OAuth2 client registration template by id (deleteClientRegistrationTemplate)

**Endpoint:** `DELETE /api/oauth2/config/template/{clientRegistrationTemplateId}`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, oAuth2ConfigTemplateService.deleteClientRegistrationTemplateById

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get the list of all OAuth2 client registration templates (getOAuth2ClientRegistrationTemplates)

**Endpoint:** `GET /api/oauth2/config/template`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `List<OAuth2ClientRegistrationTemplate>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, oAuth2ConfigTemplateService.findAllClientRegistrationTemplates

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `oauth2.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get OAuth2 clients (getOAuth2Clients)

**Endpoint:** `POST /api/noauth/oauth2Clients`

#### Purpose
Get the list of OAuth2 clients

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `List<OAuth2ClientLoginInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls request.getScheme, request.getServerName, request.getServerPort, request.getHeaderNames, headerNames.hasMoreElements, headerNames.nextElement, request.getHeader, StringUtils.isNotEmpty, PlatformType.valueOf, StringUtils.isNotEmpty, oAuth2ClientService.findOAuth2ClientLoginInfosByMobilePkgNameAndPlatformType, oAuth2ClientService.findOAuth2ClientLoginInfosByDomainName, MiscUtils.getDomainNameAndPort

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Save OAuth2 Client (saveOAuth2Client)

**Endpoint:** `POST /api/oauth2/client`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `OAuth2Client`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls oAuth2Client.setTenantId, oAuth2Client.getId, tbOauth2ClientService.save

#### Dependencies
- TbOauth2ClientService

#### Usage Flow
Called by UI: `oauth2.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get OAuth2 Client infos (findOAuth2ClientInfos)

**Endpoint:** `GET /api/oauth2/client/infos`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<OAuth2ClientInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls oAuth2ClientService.findOAuth2ClientInfosByTenantId

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### findTenantOAuth2ClientInfosByIdsV1

**Endpoint:** `GET /api/oauth2/client/infos`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `List<OAuth2ClientInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls oAuth2ClientService.findOAuth2ClientInfosByIds

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get OAuth2 Client infos By Ids (findTenantOAuth2ClientInfosByIds)

**Endpoint:** `GET /api/oauth2/client/list`

#### Purpose
Fetch OAuth2 Client info objects based on the provided ids.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `List<OAuth2ClientInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, oauth2.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get OAuth2 Client by id (getOAuth2ClientById)

**Endpoint:** `GET /api/oauth2/client/{id}`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `id` (UUID) in path

#### Response
- **Success:** `OAuth2Client`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `oauth2.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete oauth2 client (deleteOauth2Client)

**Endpoint:** `DELETE /api/oauth2/client/{id}`

#### Purpose
Deletes the oauth2 client. Referencing non-existing oauth2 client Id will cause an error.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `id` (UUID) in path

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbOauth2ClientService.delete

#### Dependencies
- TbOauth2ClientService

#### Usage Flow
Called by UI: `oauth2.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get OAuth2 log in processing URL (getLoginProcessingUrl)

**Endpoint:** `GET /api/oauth2/loginProcessingUrl`

#### Purpose
Returns the URL enclosed in

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `String`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls oAuth2Configuration.getLoginProcessingUrl

#### Dependencies
- OAuth2Configuration

#### Usage Flow
Called by UI: `oauth2.service.ts, admin.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get the Administration Settings object using key (getAdminSettings)

**Endpoint:** `GET /api/admin/settings/{key}`

#### Purpose
Get the Administration Settings object using specified string key. Referencing non-existing key will cause an error.

#### Authentication
Required: Yes
Expression: `hasAuthority('SYS_ADMIN')`

#### Request
- **Parameters:**
  - `key` (String) in path

#### Response
- **Success:** `AdminSettings`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, adminSettingsService.findAdminSettingsByKey, adminSettings.getKey, adminSettings.getJsonValue, adminSettings.getJsonValue

#### Dependencies
- AdminSettingsService

#### Usage Flow
Called by UI: `admin.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Creates or Updates the Administration Settings (saveAdminSettings)

**Endpoint:** `POST /api/admin/settings`

#### Purpose
Creates or Updates the Administration Settings. Platform generates random Administration Settings Id during settings creation.

#### Authentication
Required: Yes
Expression: `hasAuthority('SYS_ADMIN')`

#### Request
- **Body Schema:** `AdminSettings`

#### Response
- **Success:** `AdminSettings`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, adminSettings.setTenantId, adminSettingsService.saveAdminSettings, adminSettings.getKey, mailService.updateMailConfiguration, adminSettings.getJsonValue, adminSettings.getJsonValue, adminSettings.getKey, smsService.updateSmsConfiguration

#### Dependencies
- MailService, SmsService, AdminSettingsService

#### Usage Flow
Called by UI: `admin.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get the Security Settings object (getSecuritySettings)

**Endpoint:** `GET /api/admin/securitySettings`

#### Purpose
Get the Security Settings object that contains password policy, etc.

#### Authentication
Required: Yes
Expression: `hasAuthority('SYS_ADMIN')`

#### Request

#### Response
- **Success:** `SecuritySettings`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, securitySettingsService.getSecuritySettings

#### Dependencies
- SecuritySettingsService

#### Usage Flow
Called by UI: `admin.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Update Security Settings (saveSecuritySettings)

**Endpoint:** `POST /api/admin/securitySettings`

#### Purpose
Updates the Security Settings object that contains password policy, etc.

#### Authentication
Required: Yes
Expression: `hasAuthority('SYS_ADMIN')`

#### Request
- **Body Schema:** `SecuritySettings`

#### Response
- **Success:** `SecuritySettings`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, securitySettingsService.saveSecuritySettings

#### Dependencies
- SecuritySettingsService

#### Usage Flow
Called by UI: `admin.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get the JWT Settings object (getJwtSettings)

**Endpoint:** `GET /api/admin/jwtSettings`

#### Purpose
Get the JWT Settings object that contains JWT token policy, etc.

#### Authentication
Required: Yes
Expression: `hasAuthority('SYS_ADMIN')`

#### Request

#### Response
- **Success:** `JwtSettings`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, jwtSettingsService.getJwtSettings

#### Dependencies
- JwtSettingsService

#### Usage Flow
Called by UI: `admin.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Update JWT Settings (saveJwtSettings)

**Endpoint:** `POST /api/admin/jwtSettings`

#### Purpose
Updates the JWT Settings object that contains JWT token policy, etc. The tokenSigningKey field is a Base64 encoded string.

#### Authentication
Required: Yes
Expression: `hasAuthority('SYS_ADMIN')`

#### Request
- **Body Schema:** `JwtSettings`

#### Response
- **Success:** `JwtPair`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, jwtSettingsService.saveJwtSettings, tokenFactory.createTokenPair

#### Dependencies
- JwtSettingsService, JwtTokenFactory

#### Usage Flow
Called by UI: `admin.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Send test email (sendTestMail)

**Endpoint:** `POST /api/admin/settings/testMail`

#### Purpose
Attempts to send test email to the System Administrator User using Mail Settings provided as a parameter.

#### Authentication
Required: Yes
Expression: `hasAuthority('SYS_ADMIN')`

#### Request
- **Body Schema:** `AdminSettings`

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, adminSettings.getKey, adminSettings.getJsonValue, adminSettings.getJsonValue, adminSettingsService.findAdminSettingsByKey, mailSettings.getJsonValue, adminSettings.getJsonValue, settings.put, refreshToken.asText, adminSettings.getJsonValue, adminSettingsService.findAdminSettingsByKey, adminSettings.getJsonValue, mailSettings.getJsonValue, mailService.sendTestMail, adminSettings.getJsonValue, e.getMessage, e.getCause, e.getCause, e.getErrorCode

#### Dependencies
- MailService, AdminSettingsService

#### Usage Flow
Called by UI: `admin.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Send test sms (sendTestSms)

**Endpoint:** `POST /api/admin/settings/testSms`

#### Purpose
Attempts to send test sms to the System Administrator User using SMS Settings and phone number provided as a parameters of the request.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Body Schema:** `TestSmsRequest`

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, smsService.sendTestSms, auditLogService.logEntityAction, user.getTenantId, user.getCustomerId, user.getId, user.getName, user.getId, testSmsRequest.getNumberTo, auditLogService.logEntityAction, user.getTenantId, user.getCustomerId, user.getId, user.getName, user.getId, testSmsRequest.getNumberTo

#### Dependencies
- SmsService, AuditLogService

#### Usage Flow
Called by UI: `admin.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get repository settings (getRepositorySettings)

**Endpoint:** `GET /api/admin/repositorySettings`

#### Purpose
Get the repository settings object.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `RepositorySettings`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, versionControlService.getVersionControlSettings, versionControlSettings.setPassword, versionControlSettings.setPrivateKey, versionControlSettings.setPrivateKeyPassword

#### Dependencies
- EntitiesVersionControlService

#### Usage Flow
Called by UI: `admin.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Check repository settings exists (repositorySettingsExists)

**Endpoint:** `GET /api/admin/repositorySettings/exists`

#### Purpose
Check whether the repository settings exists.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `Boolean`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, versionControlService.getVersionControlSettings

#### Dependencies
- EntitiesVersionControlService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getRepositorySettingsInfo

**Endpoint:** `GET /api/admin/repositorySettings/info`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `RepositorySettingsInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, versionControlService.getVersionControlSettings, RepositorySettingsInfo.builder, repositorySettings.isReadOnly, RepositorySettingsInfo.builder

#### Dependencies
- EntitiesVersionControlService

#### Usage Flow
Called by UI: `admin.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Creates or Updates the repository settings (saveRepositorySettings)

**Endpoint:** `POST /api/admin/repositorySettings`

#### Purpose
Creates or Updates the repository settings object.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Body Schema:** `RepositorySettings`

#### Response
- **Success:** `DeferredResult<RepositorySettings>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, settings.setLocalOnly, versionControlService.saveVersionControlSettings, Futures.transform, savedSettings.setPassword, savedSettings.setPrivateKey, savedSettings.setPrivateKeyPassword, MoreExecutors.directExecutor

#### Dependencies
- EntitiesVersionControlService

#### Usage Flow
Called by UI: `admin.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete repository settings (deleteRepositorySettings)

**Endpoint:** `DELETE /api/admin/repositorySettings`

#### Purpose
Deletes the repository settings.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `DeferredResult<Void>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, versionControlService.deleteVersionControlSettings

#### Dependencies
- EntitiesVersionControlService

#### Usage Flow
Called by UI: `admin.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Check repository access (checkRepositoryAccess)

**Endpoint:** `POST /api/admin/repositorySettings/checkAccess`

#### Purpose
Attempts to check repository access.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Body Schema:** `RepositorySettings`

#### Response
- **Success:** `DeferredResult<Void>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, settings.setLocalOnly, versionControlService.checkVersionControlAccess

#### Dependencies
- EntitiesVersionControlService

#### Usage Flow
Called by UI: `admin.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get auto commit settings (getAutoCommitSettings)

**Endpoint:** `GET /api/admin/autoCommitSettings`

#### Purpose
Get the auto commit settings object.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `AutoCommitSettings`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, autoCommitSettingsService.get

#### Dependencies
- TbAutoCommitSettingsService

#### Usage Flow
Called by UI: `admin.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Check auto commit settings exists (autoCommitSettingsExists)

**Endpoint:** `GET /api/admin/autoCommitSettings/exists`

#### Purpose
Check whether the auto commit settings exists.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `Boolean`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, autoCommitSettingsService.get

#### Dependencies
- TbAutoCommitSettingsService

#### Usage Flow
Called by UI: `admin.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Creates or Updates the auto commit settings (saveAutoCommitSettings)

**Endpoint:** `POST /api/admin/autoCommitSettings`

#### Purpose
Creates or Updates the auto commit settings object.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Body Schema:** `AutoCommitSettings`

#### Response
- **Success:** `AutoCommitSettings`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls settings.values, VcUtils.checkBranchName, config.getBranch, accessControlService.checkPermission, autoCommitSettingsService.save

#### Dependencies
- TbAutoCommitSettingsService

#### Usage Flow
Called by UI: `admin.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete auto commit settings (deleteAutoCommitSettings)

**Endpoint:** `DELETE /api/admin/autoCommitSettings`

#### Purpose
Deletes the auto commit settings.

#### Authentication
Required: Yes
Expression: `hasAuthority('SYS_ADMIN')`

#### Request

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, autoCommitSettingsService.delete

#### Dependencies
- TbAutoCommitSettingsService

#### Usage Flow
Called by UI: `admin.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Check for new Platform Releases (checkUpdates)

**Endpoint:** `GET /api/admin/updates`

#### Purpose
Check notifications about new platform releases.

#### Authentication
Required: Yes
Expression: `hasAuthority('SYS_ADMIN')`

#### Request

#### Response
- **Success:** `UpdateMessage`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls updateService.checkUpdates

#### Dependencies
- UpdateService

#### Usage Flow
Called by UI: `admin.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get system info (getSystemInfo)

**Endpoint:** `GET /api/admin/systemInfo`

#### Purpose
Get main information about system.

#### Authentication
Required: Yes
Expression: `hasAuthority('SYS_ADMIN')`

#### Request

#### Response
- **Success:** `SystemInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls systemInfoService.getSystemInfo

#### Dependencies
- SystemInfoService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get features info (getFeaturesInfo)

**Endpoint:** `GET /api/admin/featuresInfo`

#### Purpose
Get information about enabled/disabled features.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN')`

#### Request

#### Response
- **Success:** `FeaturesInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls systemInfoService.getFeaturesInfo

#### Dependencies
- SystemInfoService

#### Usage Flow
Called by UI: `admin.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get OAuth2 log in processing URL (getMailProcessingUrl)

**Endpoint:** `GET /api/admin/mail/oauth2/loginProcessingUrl`

#### Purpose
Returns the URL enclosed in

#### Authentication
Required: Yes
Expression: `hasAuthority('SYS_ADMIN')`

#### Request

#### Response
- **Success:** `String`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `admin.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Redirect user to mail provider login page.

**Endpoint:** `GET /api/admin/mail/oauth2/authorize`

#### Purpose
After user logged in and provided access

#### Authentication
Required: Yes
Expression: `hasAuthority('SYS_ADMIN')`

#### Request

#### Response
- **Success:** `String`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls StringUtils.generateSafeToken, request.getParameter, CookieUtils.addCookie, request.getParameter, CookieUtils.addCookie, accessControlService.checkPermission, adminSettingsService.findAdminSettingsByKey, adminSettings.getJsonValue, jsonValue.get, jsonValue.get, jsonValue.get, JacksonUtil.convertValue, jsonValue.get

#### Dependencies
- AdminSettingsService

#### Usage Flow
Called by UI: `admin.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### handleMailOAuth2Callback

**Endpoint:** `GET /api/admin/mail/oauth2/code`

#### Purpose
No description provided in source.

#### Authentication
Required: No
Expression: `None`

#### Request
- **Parameters:**
  - `code` (String) in query
  - `state` (String) in query

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls CookieUtils.getCookie, CookieUtils.getCookie, systemSecurityService.getBaseUrl, prevUrlOpt.isPresent, prevUrlOpt.get, cookieState.isEmpty, cookieState.get, CookieUtils.deleteCookie, CookieUtils.deleteCookie, CookieUtils.deleteCookie, adminSettingsService.findAdminSettingsByKey, adminSettings.getJsonValue, jsonValue.get, jsonValue.get, jsonValue.get, jsonValue.get, e.getMessage, e.getMessage, tokenResponse.getRefreshToken, adminSettingsService.saveAdminSettings, response.sendRedirect

#### Dependencies
- AdminSettingsService, SystemSecurityService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Save or Update Domain (saveDomain)

**Endpoint:** `POST /api/domain`

#### Purpose
Create or update the Domain. When creating domain, platform generates Domain Id as

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN')`

#### Request

#### Response
- **Success:** `Domain`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls domain.setTenantId, domain.getId, tbDomainService.save

#### Dependencies
- TbDomainService

#### Usage Flow
Called by UI: `domain.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Update oauth2 clients (updateDomainOauth2Clients)

**Endpoint:** `PUT /api/domain/{id}/oauth2Clients`

#### Purpose
Update oauth2 clients for the specified domain.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN')`

#### Request
- **Parameters:**
  - `id` (UUID) in path

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbDomainService.updateOauth2Clients

#### Dependencies
- TbDomainService

#### Usage Flow
Called by UI: `domain.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Domain infos (getDomainInfos)

**Endpoint:** `GET /api/domain/infos`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<DomainInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, domainService.findDomainInfosByTenantId

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Domain info by Id (getDomainInfoById)

**Endpoint:** `GET /api/domain/info/{id}`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAuthority('SYS_ADMIN')`

#### Request
- **Parameters:**
  - `id` (UUID) in path

#### Response
- **Success:** `DomainInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `domain.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete Domain by ID (deleteDomain)

**Endpoint:** `DELETE /api/domain/{id}`

#### Purpose
Deletes Domain by ID. Referencing non-existing domain Id will cause an error.

#### Authentication
Required: Yes
Expression: `hasAuthority('SYS_ADMIN')`

#### Request
- **Parameters:**
  - `id` (UUID) in path

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbDomainService.delete

#### Dependencies
- TbDomainService

#### Usage Flow
Called by UI: `domain.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getSystemVersionInfo

**Endpoint:** `GET /api/system/info`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `JsonNode`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getSystemParams

**Endpoint:** `GET /api/system/params`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `SystemParams`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls currentUser.getTenantId, currentUser.getCustomerId, currentUser.isSystemAdmin, currentUser.isTenantAdmin, systemParams.setUserTokenAccessEnabled, systemParams.setUserTokenAccessEnabled, currentUser.isTenantAdmin, currentUser.isCustomerUser, currentUser.isTenantAdmin, dashboardService.findDashboardsByTenantId, dashboardService.findDashboardsByTenantIdAndCustomerId, systemParams.setAllowedDashboardIds, dashboards.stream, d.getId, Collectors.toList, systemParams.setAllowedDashboardIds, Collections.emptyList, systemParams.setEdgesSupportEnabled, currentUser.isTenantAdmin, systemParams.setHasRepository, versionControlService.getVersionControlSettings, systemParams.setTbelEnabled, systemParams.setHasRepository, systemParams.setTbelEnabled, currentUser.isTenantAdmin, currentUser.isCustomerUser, systemParams.setPersistDeviceStateToTelemetry, systemParams.setPersistDeviceStateToTelemetry, userSettingsService.findUserSettings, currentUser.getTenantId, currentUser.getId, JacksonUtil.newObjectNode, userSettings.getSettings, userSettingsNode.has, userSettingsNode.set, JacksonUtil.newArrayNode, systemParams.setUserSettings, systemParams.setMaxDatapointsLimit, systemParams.setNullsOrderStrategy, ACCEPTED_NULLS_ORDER_STRATEGIES.contains, systemParams.setEdqsEnabled, edqsService.isApiEnabled, currentUser.isSystemAdmin, tenantProfileCache.get, systemParams.setMaxResourceSize, tenantProfileConfiguration.getMaxResourceSize, systemParams.setMaxDebugModeDurationMinutes, DebugModeUtil.getMaxDebugAllDuration, tenantProfileConfiguration.getMaxDebugModeDurationMinutes, debugModeRateLimitsConfig.isRuleChainDebugPerTenantLimitsEnabled, systemParams.setRuleChainDebugPerTenantLimitsConfiguration, debugModeRateLimitsConfig.getRuleChainDebugPerTenantLimitsConfiguration, debugModeRateLimitsConfig.isCalculatedFieldDebugPerTenantLimitsEnabled, systemParams.setCalculatedFieldDebugPerTenantLimitsConfiguration, debugModeRateLimitsConfig.getCalculatedFieldDebugPerTenantLimitsConfiguration, systemParams.setMaxArgumentsPerCF, tenantProfileConfiguration.getMaxArgumentsPerCF, systemParams.setMaxDataPointsPerRollingArg, tenantProfileConfiguration.getMaxDataPointsPerRollingArg, systemParams.setMinAllowedScheduledUpdateIntervalInSecForCF, tenantProfileConfiguration.getMinAllowedScheduledUpdateIntervalInSecForCF, systemParams.setMaxRelationLevelPerCfArgument, tenantProfileConfiguration.getMaxRelationLevelPerCfArgument, systemParams.setMaxRelatedEntitiesToReturnPerCfArgument, tenantProfileConfiguration.getMaxRelatedEntitiesToReturnPerCfArgument, systemParams.setMinAllowedDeduplicationIntervalInSecForCF, tenantProfileConfiguration.getMinAllowedDeduplicationIntervalInSecForCF, systemParams.setMinAllowedAggregationIntervalInSecForCF, tenantProfileConfiguration.getMinAllowedAggregationIntervalInSecForCF, systemParams.setIntermediateAggregationIntervalInSecForCF, tenantProfileConfiguration.getIntermediateAggregationIntervalInSecForCF, systemParams.setTrendzSettings, trendzSettingsService.findTrendzSettings, currentUser.getTenantId, systemParams.setMobileQrEnabled, Optional.ofNullable, qrCodeSettingService.findQrCodeSettings, systemParams.setAllowKeyFiltersOrConditions, PUBLIC_ID.equals, currentUser.getUserPrincipal, currentUser.getAdditionalInfo, currentUser.getAdditionalInfo, currentUser.getAdditionalInfo, JacksonUtil.newObjectNode, infoObject.put, buildProperties.getVersion, infoObject.put, buildProperties.getArtifact, infoObject.put, buildProperties.getName, infoObject.put, infoObject.put

#### Dependencies
- BuildProperties, EntitiesVersionControlService, QrCodeSettingService, DebugModeRateLimitsConfig, TrendzSettingsService, EdqsService

#### Usage Flow
Called by UI: `auth.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getTenantUsageInfo

**Endpoint:** `GET /api/usage`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `UsageInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls usageInfoService.getUsageInfo

#### Dependencies
- UsageInfoService

#### Usage Flow
Called by UI: `usage-info.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

## Domain: Alarm Management

### Create Or Update Alarm Rule (saveAlarmRule)

**Endpoint:** `POST /api/alarm/rule`

#### Purpose
Creates or Updates the Alarm Rule. When creating alarm rule, platform generates Alarm Rule Id as

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Body Schema:** `AlarmRuleDefinition`

#### Response
- **Success:** `AlarmRuleDefinition`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls parameters.RequestBody, alarmRuleDefinition.setTenantId, alarmRuleDefinition.getEntityId, alarmRuleDefinition.getId, alarmRuleDefinition.getId, alarmRuleDefinition.toCalculatedField, calculatedField.getConfiguration, tbCalculatedFieldService.save, AlarmRuleDefinition.fromCalculatedField

#### Dependencies
- TbCalculatedFieldService

#### Usage Flow
Called by UI: `alarm-rules.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Alarm Rule (getAlarmRuleById)

**Endpoint:** `GET /api/alarm/rule/{alarmRuleId}`

#### Purpose
Fetch the Alarm Rule object based on the provided Alarm Rule Id.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `AlarmRuleDefinition`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls calculatedField.getEntityId, AlarmRuleDefinition.fromCalculatedField

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `alarm-rules.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Alarm Rules by Entity Id (getAlarmRulesByEntityId)

**Endpoint:** `GET /api/alarm/rules/{entityType}/{entityId}`

#### Purpose
Fetch the Alarm Rules based on the provided Entity Id.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `entityType` (String) in path
  - `entityId` (String) in path
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<AlarmRuleDefinition>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls EntityIdFactory.getByTypeAndUuid, tbCalculatedFieldService.findByTenantIdAndEntityId, result.mapData

#### Dependencies
- TbCalculatedFieldService

#### Usage Flow
Called by UI: `alarm-rules.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get alarm rules (getAlarmRules)

**Endpoint:** `GET /api/alarm/rules`

#### Purpose
Fetch tenant alarm rules based on the filter.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<AlarmRuleDefinitionInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls SUPPORTED_ENTITIES.entrySet, entry.getValue, Collectors.toSet, EnumSet.of, CalculatedFieldFilter.builder, EnumSet.of, calculatedFieldService.findCalculatedFieldsByTenantIdAndFilter, user.getTenantId, result.mapData

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `alarm-rules.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get alarm rule names (getAlarmRuleNames)

**Endpoint:** `GET /api/alarm/rules/names`

#### Purpose
Fetch the list of alarm rule names.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<String>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls calculatedFieldService.findCalculatedFieldNamesByTenantIdAndType

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `alarm-rules.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete Alarm Rule (deleteAlarmRule)

**Endpoint:** `DELETE /api/alarm/rule/{alarmRuleId}`

#### Purpose
Deletes the alarm rule. Referencing non-existing Alarm Rule Id will cause an error.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls calculatedField.getEntityId, tbCalculatedFieldService.delete

#### Dependencies
- TbCalculatedFieldService

#### Usage Flow
Called by UI: `alarm-rules.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get latest alarm rule debug event (getLatestAlarmRuleDebugEvent)

**Endpoint:** `GET /api/alarm/rule/{alarmRuleId}/debug`

#### Purpose
Gets latest alarm rule debug event for specified alarm rule id.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `JsonNode`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls calculatedField.getEntityId, Optional.ofNullable, eventService.findLatestEvents, events.stream

#### Dependencies
- EventService

#### Usage Flow
Called by UI: `alarm-rules.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Test alarm rule TBEL expression (testAlarmRuleScript)

**Endpoint:** `POST /api/alarm/rule/testScript`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Body Schema:** `JsonNode`

#### Response
- **Success:** `JsonNode`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls parameters.RequestBody, inputParams.has, inputParams.get, tbCalculatedFieldService.executeTestScript, tbCalculatedFieldService.findById, calculatedField.getType

#### Dependencies
- TbCalculatedFieldService

#### Usage Flow
Called by UI: `alarm-rules.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Create or update Alarm Comment

**Endpoint:** `POST /api/alarm/{alarmId}/comment`

#### Purpose
Creates or Updates the Alarm Comment.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Body Schema:** `AlarmComment`

#### Response
- **Success:** `AlarmComment`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls parameters.RequestBody, alarmComment.setAlarmId, alarmComment.setType, tbAlarmCommentService.saveAlarmComment

#### Dependencies
- TbAlarmCommentService

#### Usage Flow
Called by UI: `alarm-comment.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete Alarm comment (deleteAlarmComment)

**Endpoint:** `DELETE /api/alarm/{alarmId}/comment/{commentId}`

#### Purpose
Deletes the Alarm comment. Referencing non-existing Alarm comment Id will cause an error.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbAlarmCommentService.deleteAlarmComment

#### Dependencies
- TbAlarmCommentService

#### Usage Flow
Called by UI: `alarm-comment.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Alarm comments (getAlarmComments)

**Endpoint:** `GET /api/alarm/{alarmId}/comment`

#### Purpose
Returns a page of alarm comments for specified alarm.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<AlarmCommentInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls alarmCommentService.findAlarmComments, alarm.getTenantId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `alarm-comment.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Alarm (getAlarmById)

**Endpoint:** `GET /api/alarm/{alarmId}`

#### Purpose
Fetch the Alarm object based on the provided Alarm Id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `Alarm`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `alarm.service.ts, alarm-rules.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Alarm Info (getAlarmInfoById)

**Endpoint:** `GET /api/alarm/info/{alarmId}`

#### Purpose
Fetch the Alarm Info object based on the provided Alarm Id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `AlarmInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `alarm.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Create or Update Alarm (saveAlarm)

**Endpoint:** `POST /api/alarm`

#### Purpose
Creates or Updates the Alarm.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Body Schema:** `Alarm`

#### Response
- **Success:** `Alarm`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls parameters.RequestBody, alarm.setTenantId, alarm.getOriginator, alarm.getId, alarm.getOriginator, alarm.getAssigneeId, alarm.getAssigneeId, tbAlarmService.save

#### Dependencies
- TbAlarmService

#### Usage Flow
Called by UI: `alarm-comment.service.ts, alarm.service.ts, alarm-rules.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete Alarm (deleteAlarm)

**Endpoint:** `DELETE /api/alarm/{alarmId}`

#### Purpose
Deletes the Alarm. Referencing non-existing Alarm Id will cause an error.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `boolean`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbAlarmService.delete

#### Dependencies
- TbAlarmService

#### Usage Flow
Called by UI: `alarm-comment.service.ts, alarm.service.ts, alarm-rules.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Acknowledge Alarm (ackAlarm)

**Endpoint:** `POST /api/alarm/{alarmId}/ack`

#### Purpose
Acknowledge the Alarm.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `AlarmInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbAlarmService.ack

#### Dependencies
- TbAlarmService

#### Usage Flow
Called by UI: `alarm.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Clear Alarm (clearAlarm)

**Endpoint:** `POST /api/alarm/{alarmId}/clear`

#### Purpose
Clear the Alarm.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `AlarmInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbAlarmService.clear

#### Dependencies
- TbAlarmService

#### Usage Flow
Called by UI: `alarm.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Assign/Reassign Alarm (assignAlarm)

**Endpoint:** `POST /api/alarm/{alarmId}/assign/{assigneeId}`

#### Purpose
Assign the Alarm.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `Alarm`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls UUID.fromString, tbAlarmService.assign, System.currentTimeMillis

#### Dependencies
- TbAlarmService

#### Usage Flow
Called by UI: `alarm.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Unassign Alarm (unassignAlarm)

**Endpoint:** `DELETE /api/alarm/{alarmId}/assign`

#### Purpose
Unassign the Alarm.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `Alarm`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbAlarmService.unassign, System.currentTimeMillis

#### Dependencies
- TbAlarmService

#### Usage Flow
Called by UI: `alarm.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Alarms (getAlarmsByEntity)

**Endpoint:** `GET /api/alarm/{entityType}/{entityId}`

#### Purpose
Returns a page of alarms for the selected entity. Specifying both parameters 'searchStatus' and 'status' at the same time will cause an error.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<AlarmInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls EntityIdFactory.getByTypeAndId, StringUtils.isEmpty, AlarmSearchStatus.valueOf, StringUtils.isEmpty, AlarmStatus.valueOf, UUID.fromString, alarmService.findAlarms

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `alarm-comment.service.ts, alarm.service.ts, alarm-rules.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get All Alarms (getAllAlarms)

**Endpoint:** `GET /api/alarms`

#### Purpose
Returns a page of alarms that belongs to the current user owner.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<AlarmInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls StringUtils.isEmpty, AlarmSearchStatus.valueOf, StringUtils.isEmpty, AlarmStatus.valueOf, UUID.fromString, alarmService.findCustomerAlarms, alarmService.findAlarms

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `alarm.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Alarms (getAlarmsV2)

**Endpoint:** `GET /api/v2/alarm/{entityType}/{entityId}`

#### Purpose
Returns a page of alarms for the selected entity.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<AlarmInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls EntityIdFactory.getByTypeAndId, StringUtils.isEmpty, alarmStatusList.add, AlarmSearchStatus.valueOf, StringUtils.isEmpty, alarmSeverityList.add, AlarmSeverity.valueOf, Arrays.asList, Collections.emptyList, UUID.fromString, alarmService.findAlarmsV2

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `alarm.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get All Alarms (getAllAlarmsV2)

**Endpoint:** `GET /api/v2/alarms`

#### Purpose
Returns a page of alarms that belongs to the current user owner.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<AlarmInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls StringUtils.isEmpty, alarmStatusList.add, AlarmSearchStatus.valueOf, StringUtils.isEmpty, alarmSeverityList.add, AlarmSeverity.valueOf, Arrays.asList, Collections.emptyList, UUID.fromString, alarmService.findCustomerAlarmsV2, alarmService.findAlarmsV2

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `alarm.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Highest Alarm Severity (getHighestAlarmSeverity)

**Endpoint:** `GET /api/alarm/highestSeverity/{entityType}/{entityId}`

#### Purpose
Search the alarms by originator ('entityType' and entityId') and optional 'status' or 'searchStatus' filters and returns the highest AlarmSeverity(CRITICAL, MAJOR, MINOR, WARNING or INDETERMINATE).

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `AlarmSeverity`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls EntityIdFactory.getByTypeAndId, StringUtils.isEmpty, AlarmSearchStatus.valueOf, StringUtils.isEmpty, AlarmStatus.valueOf, alarmService.findHighestAlarmSeverity

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `alarm.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Alarm Types (getAlarmTypes)

**Endpoint:** `GET /api/alarm/types`

#### Purpose
Returns a set of unique alarm types based on alarms that are either owned by the tenant or assigned to the customer which user is performing the request.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<EntitySubtype>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls alarmService.findAlarmTypesByTenantId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `alarm.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

## Domain: Asset Management

### Get Asset Profile (getAssetProfileById)

**Endpoint:** `GET /api/assetProfile/{assetProfileId}`

#### Purpose
Fetch the Asset Profile object based on the provided Asset Profile Id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `AssetProfile`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls imageService.inlineImage

#### Dependencies
- ImageService

#### Usage Flow
Called by UI: `asset-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Asset Profile Info (getAssetProfileInfoById)

**Endpoint:** `GET /api/assetProfileInfo/{assetProfileId}`

#### Purpose
Fetch the Asset Profile Info object based on the provided Asset Profile Id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `AssetProfileInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `asset-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Default Asset Profile (getDefaultAssetProfileInfo)

**Endpoint:** `GET /api/assetProfileInfo/default`

#### Purpose
Fetch the Default Asset Profile Info object.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `AssetProfileInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls assetProfileService.findDefaultAssetProfileInfo

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `asset-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Create Or Update Asset Profile (saveAssetProfile)

**Endpoint:** `POST /api/assetProfile`

#### Purpose
Create or update the Asset Profile. When creating asset profile, platform generates asset profile id as

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Body Schema:** `AssetProfile`

#### Response
- **Success:** `AssetProfile`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls assetProfile.setTenantId, assetProfile.getId, tbAssetProfileService.save

#### Dependencies
- TbAssetProfileService

#### Usage Flow
Called by UI: `asset-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete asset profile (deleteAssetProfile)

**Endpoint:** `DELETE /api/assetProfile/{assetProfileId}`

#### Purpose
Deletes the asset profile. Referencing non-existing asset profile Id will cause an error.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbAssetProfileService.delete

#### Dependencies
- TbAssetProfileService

#### Usage Flow
Called by UI: `asset-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Make Asset Profile Default (setDefaultAssetProfile)

**Endpoint:** `POST /api/assetProfile/{assetProfileId}/default`

#### Purpose
Marks asset profile as default within a tenant scope.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `AssetProfile`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls assetProfileService.findDefaultAssetProfile, tbAssetProfileService.setDefaultAssetProfile

#### Dependencies
- TbAssetProfileService

#### Usage Flow
Called by UI: `asset-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Asset Profiles (getAssetProfiles)

**Endpoint:** `GET /api/assetProfiles`

#### Purpose
Returns a page of asset profile objects owned by tenant.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<AssetProfile>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls assetProfileService.findAssetProfiles

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, asset-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Asset Profile infos (getAssetProfileInfos)

**Endpoint:** `GET /api/assetProfileInfos`

#### Purpose
Returns a page of asset profile info objects owned by tenant.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<AssetProfileInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls assetProfileService.findAssetProfileInfos

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, asset-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Asset Profile names (getAssetProfileNames)

**Endpoint:** `GET /api/assetProfile/names`

#### Purpose
Returns a set of unique asset profile names owned by the tenant.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `List<EntityInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls user.getTenantId, assetProfileService.findAssetProfileNamesByTenantId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, asset-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getAssetProfilesByIdsV1

**Endpoint:** `GET /api/assetProfileInfos`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `assetProfileIds` (Set<UUID>) in query

#### Response
- **Success:** `List<AssetProfileInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls assetProfileIds.add, assetProfileService.findAssetProfilesByIds

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Asset Profiles By Ids (getAssetProfilesByIds)

**Endpoint:** `GET /api/assetProfileInfos/list`

#### Purpose
Requested asset profiles must be owned by tenant which is performing the request.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `assetProfileIds` (Set<UUID>) in query

#### Response
- **Success:** `List<AssetProfileInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, asset-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Asset (getAssetById)

**Endpoint:** `GET /api/asset/{assetId}`

#### Purpose
Fetch the Asset object based on the provided Asset Id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `Asset`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `asset.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Asset Info (getAssetInfoById)

**Endpoint:** `GET /api/asset/info/{assetId}`

#### Purpose
Fetch the Asset Info object based on the provided Asset Id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `AssetInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `asset.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Create Or Update Asset (saveAsset)

**Endpoint:** `POST /api/asset`

#### Purpose
Creates or Updates the Asset. When creating asset, platform generates Asset Id as

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Body Schema:** `Asset`

#### Response
- **Success:** `Asset`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls parameters.RequestBody, asset.setTenantId, asset.getId, tbAssetService.save

#### Dependencies
- TbAssetService

#### Usage Flow
Called by UI: `asset.service.ts, asset-profile.service.ts, entity.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete asset (deleteAsset)

**Endpoint:** `DELETE /api/asset/{assetId}`

#### Purpose
Deletes the asset and all the relations (from and to the asset). Referencing non-existing asset Id will cause an error.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbAssetService.delete

#### Dependencies
- TbAssetService

#### Usage Flow
Called by UI: `asset.service.ts, asset-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Assign asset to customer (assignAssetToCustomer)

**Endpoint:** `POST /api/customer/{customerId}/asset/{assetId}`

#### Purpose
Creates assignment of the asset to customer. Customer will be able to query asset afterwards.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `customerId` (String) in path

#### Response
- **Success:** `Asset`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbAssetService.assignAssetToCustomer

#### Dependencies
- TbAssetService

#### Usage Flow
Called by UI: `asset.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Unassign asset from customer (unassignAssetFromCustomer)

**Endpoint:** `DELETE /api/customer/asset/{assetId}`

#### Purpose
Clears assignment of the asset to customer. Customer will not be able to query asset afterwards.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `Asset`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls asset.getCustomerId, asset.getCustomerId, asset.getCustomerId, tbAssetService.unassignAssetToCustomer

#### Dependencies
- TbAssetService

#### Usage Flow
Called by UI: `asset.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Make asset publicly available (assignAssetToPublicCustomer)

**Endpoint:** `POST /api/customer/public/asset/{assetId}`

#### Purpose
Asset will be available for non-authorized (not logged-in) users.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `Asset`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbAssetService.assignAssetToPublicCustomer

#### Dependencies
- TbAssetService

#### Usage Flow
Called by UI: `asset.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Tenant Assets (getTenantAssets)

**Endpoint:** `GET /api/tenant/assets`

#### Purpose
Returns a page of assets owned by tenant.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<Asset>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls type.trim, assetService.findAssetsByTenantIdAndType, assetService.findAssetsByTenantId

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Tenant Asset Infos (getTenantAssetInfos)

**Endpoint:** `GET /api/tenant/assetInfos`

#### Purpose
Returns a page of assets info objects owned by tenant.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<AssetInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls type.trim, assetService.findAssetInfosByTenantIdAndType, assetProfileId.length, assetService.findAssetInfosByTenantIdAndAssetProfileId, assetService.findAssetInfosByTenantId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `asset.service.ts, entity.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getTenantAsset

**Endpoint:** `GET /api/tenant/assets`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `assetName` (String) in query

#### Response
- **Success:** `Asset`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls assetService.findAssetByTenantIdAndName

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `asset.service.ts, entity.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Tenant Asset (getTenantAssetByName)

**Endpoint:** `GET /api/tenant/asset`

#### Purpose
Requested asset must be owned by tenant that the user belongs to.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `assetName` (String) in query

#### Response
- **Success:** `Asset`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Customer Assets (getCustomerAssets)

**Endpoint:** `GET /api/customer/{customerId}/assets`

#### Purpose
Returns a page of assets objects assigned to customer.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `customerId` (String) in path
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<Asset>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls type.trim, assetService.findAssetsByTenantIdAndCustomerIdAndType, assetService.findAssetsByTenantIdAndCustomerId

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Customer Asset Infos (getCustomerAssetInfos)

**Endpoint:** `GET /api/customer/{customerId}/assetInfos`

#### Purpose
Returns a page of assets info objects assigned to customer.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `customerId` (String) in path
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<AssetInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls type.trim, assetService.findAssetInfosByTenantIdAndCustomerIdAndType, assetProfileId.length, assetService.findAssetInfosByTenantIdAndCustomerIdAndAssetProfileId, assetService.findAssetInfosByTenantIdAndCustomerId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `asset.service.ts, entity.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Assets By Ids (getAssetsByIds)

**Endpoint:** `GET /api/assets`

#### Purpose
Requested assets must be owned by tenant or assigned to customer which user is performing the request.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `List<Asset>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls user.getTenantId, user.getCustomerId, assetIds.add, customerId.isNullUid, assetService.findAssetsByTenantIdAndIdsAsync, assetService.findAssetsByTenantIdCustomerIdAndIdsAsync, assets.get

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `asset.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Find related assets (findAssetsByQuery)

**Endpoint:** `POST /api/assets`

#### Purpose
Returns all assets that are related to the specific entity.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Body Schema:** `AssetSearchQuery`

#### Response
- **Success:** `List<Asset>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls query.getParameters, query.getAssetTypes, query.getParameters, assetService.findAssetsByQuery, assets.stream, accessControlService.checkPermission, asset.getId, Collectors.toList

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `asset.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Asset Types (getAssetTypes)

**Endpoint:** `GET /api/asset/types`

#### Purpose
Deprecated. See 'getAssetProfileNames' API from Asset Profile Controller instead.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `List<EntitySubtype>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls user.getTenantId, assetService.findAssetTypesByTenantId, assetTypes.get

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `asset.service.ts`

#### Risks / Edge Cases
- **DEPRECATED:** This API is marked as deprecated and should not be used in new developments.
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Assign asset to edge (assignAssetToEdge)

**Endpoint:** `POST /api/edge/{edgeId}/asset/{assetId}`

#### Purpose
Creates assignment of an existing asset to an instance of The Edge.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `Asset`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbAssetService.assignAssetToEdge

#### Dependencies
- TbAssetService

#### Usage Flow
Called by UI: `asset.service.ts`

#### Risks / Edge Cases
- **DEPRECATED:** This API is marked as deprecated and should not be used in new developments.
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Unassign asset from edge (unassignAssetFromEdge)

**Endpoint:** `DELETE /api/edge/{edgeId}/asset/{assetId}`

#### Purpose
Clears assignment of the asset to the edge.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `Asset`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbAssetService.unassignAssetFromEdge

#### Dependencies
- TbAssetService

#### Usage Flow
Called by UI: `asset.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get assets assigned to edge (getEdgeAssets)

**Endpoint:** `GET /api/edge/{edgeId}/assets`

#### Purpose
Returns a page of assets assigned to edge.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<Asset>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls type.trim, assetService.findAssetsByTenantIdAndEdgeIdAndType, assetService.findAssetsByTenantIdAndEdgeId, nonFilteredResult.getData, accessControlService.checkPermission, asset.getId, Collectors.toList, nonFilteredResult.getTotalPages, nonFilteredResult.getTotalElements, nonFilteredResult.hasNext

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `asset.service.ts, entity.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Import the bulk of assets (processAssetBulkImport)

**Endpoint:** `POST /api/asset/bulk_import`

#### Purpose
There's an ability to import the bulk of assets using the only .csv file.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request
- **Body Schema:** `BulkImportRequest`

#### Response
- **Success:** `BulkImportResult<Asset>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls assetBulkImportService.processBulkImport

#### Dependencies
- AssetBulkImportService

#### Usage Flow
Called by UI: `asset.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

## Domain: Authentication & Authorization

### Login

**Endpoint:** `POST /api/auth/login`

#### Purpose
Login with username and password to get JWT token.

#### Authentication
Required: No
Expression: `None`

#### Request
- **Body Schema:** `LoginRequest`

#### Response
- **Success:** `JwtPair`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Authenticates user and returns JWT access/refresh token pair.

#### Dependencies
- UserService, JwtTokenFactory

#### Usage Flow
Called by UI: `auth.service.ts, oauth2.service.ts, admin.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Request 2FA verification code (requestTwoFaVerificationCode)

**Endpoint:** `POST /api/auth/2fa/verification/send`

#### Purpose
Request 2FA verification code.

#### Authentication
Required: Yes
Expression: `hasAuthority('PRE_VERIFICATION_TOKEN')`

#### Request
- **Parameters:**
  - `providerType` (TwoFaProviderType) in query

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls twoFactorAuthService.prepareVerificationCode

#### Dependencies
- TwoFactorAuthService

#### Usage Flow
Called by UI: `two-factor-authentication.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Check 2FA verification code (checkTwoFaVerificationCode)

**Endpoint:** `POST /api/auth/2fa/verification/check`

#### Purpose
Checks 2FA verification code, and if it is correct the method returns a regular access and refresh token pair.

#### Authentication
Required: Yes
Expression: `hasAuthority('PRE_VERIFICATION_TOKEN')`

#### Request
- **Parameters:**
  - `providerType` (TwoFaProviderType) in query
  - `verificationCode` (String) in query

#### Response
- **Success:** `JwtPair`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls twoFactorAuthService.checkVerificationCode

#### Dependencies
- TwoFactorAuthService

#### Usage Flow
Called by UI: `auth.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get available 2FA providers (getAvailableTwoFaProviderInfos)

**Endpoint:** `GET /api/auth/2fa/providers`

#### Purpose
Get the list of 2FA provider infos available for user to use. Example:\n

#### Authentication
Required: Yes
Expression: `hasAuthority('PRE_VERIFICATION_TOKEN')`

#### Request

#### Response
- **Success:** `List<TwoFaProviderInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls twoFaConfigManager.getPlatformTwoFaSettings, user.getTenantId, twoFaConfigManager.getAccountTwoFaSettings, user.getTenantId, settings.getConfigs, Collections.emptyList, config.getProviderType, StringUtils.obfuscate, phoneNumber.indexOf, phoneNumber.length, StringUtils.obfuscate, email.indexOf, TwoFaProviderInfo.builder, config.getProviderType, config.isUseByDefault, platformTwoFaSettings.get, Collectors.toList

#### Dependencies
- TwoFaConfigManager

#### Usage Flow
Called by UI: `auth.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get regular token pair after successfully configuring 2FA

**Endpoint:** `POST /api/auth/2fa/login`

#### Purpose
Checks 2FA is configured, returning token pair on success.

#### Authentication
Required: Yes
Expression: `hasAuthority('MFA_CONFIGURATION_TOKEN')`

#### Request

#### Response
- **Success:** `JwtPair`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls twoFactorAuthService.isTwoFaEnabled, user.getTenantId, user.getTenantId, user.getId, userService.findUserById, user.getTenantId, user.getId, user.getUserPrincipal, tokenFactory.createTokenPair, systemSecurityService.logLoginAction

#### Dependencies
- TwoFactorAuthService, JwtTokenFactory, SystemSecurityService, UserService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get current User (getUser)

**Endpoint:** `GET /api/auth/user`

#### Purpose
Get the information about the User which credentials are used to perform this REST API call.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `User`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls userService.findUserById, securityUser.getTenantId, securityUser.getId, user.getAdditionalInfo

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `user-settings.service.ts, entity.service.ts, api-key.service.ts, user.service.ts, auth.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Logout (logout)

**Endpoint:** `POST /api/auth/logout`

#### Purpose
Special API call to record the 'logout' of the user to the Audit Logs. Since platform uses [JWT](https://jwt.io/), the actual logout is the procedure of clearing the [JWT](https://jwt.io/) token on the client side.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `auth.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Change password for current User (changePassword)

**Endpoint:** `POST /api/auth/changePassword`

#### Purpose
Change the password for the User which credentials are used to perform this REST API call. Be aware that previously generated [JWT](https://jwt.io/) tokens will be still valid until they expire.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Body Schema:** `ChangePasswordRequest`

#### Response
- **Success:** `JwtPair`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls changePasswordRequest.getCurrentPassword, changePasswordRequest.getNewPassword, userService.findUserCredentialsByUserId, securityUser.getId, passwordEncoder.matches, userCredentials.getPassword, systemSecurityService.validatePassword, passwordEncoder.matches, userCredentials.getPassword, userCredentials.setPassword, passwordEncoder.encode, userService.replaceUserCredentials, securityUser.getTenantId, eventPublisher.publishEvent, securityUser.getId, tokenFactory.createTokenPair

#### Dependencies
- BCryptPasswordEncoder, JwtTokenFactory, SystemSecurityService, ApplicationEventPublisher

#### Usage Flow
Called by UI: `auth.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get the current User password policy (getUserPasswordPolicy)

**Endpoint:** `GET /api/noauth/userPasswordPolicy`

#### Purpose
API call to get the password policy for the password validation form(s).

#### Authentication
Required: No
Expression: `None`

#### Request

#### Response
- **Success:** `UserPasswordPolicy`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls securitySettingsService.getSecuritySettings, securitySettings.getPasswordPolicy

#### Dependencies
- SecuritySettingsService

#### Usage Flow
Called by UI: `auth.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Check Activate User Token (checkActivateToken)

**Endpoint:** `GET /api/noauth/activate`

#### Purpose
Checks the activation token and forwards user to 'Create Password' page.

#### Authentication
Required: No
Expression: `None`

#### Request
- **Parameters:**
  - `activateToken` (String) in query

#### Response
- **Success:** `ResponseEntity<?>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls userService.findUserCredentialsByActivateToken, userCredentials.isActivationTokenExpired

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Request reset password email (requestResetPasswordByEmail)

**Endpoint:** `POST /api/noauth/resetPasswordByEmail`

#### Purpose
Request to send the reset password email if the user with specified email address is present in the database.

#### Authentication
Required: No
Expression: `None`

#### Request
- **Body Schema:** `ResetPasswordEmailRequest`

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls resetPasswordByEmailRequest.getEmail, userService.requestPasswordReset, userService.findUserById, userCredentials.getUserId, systemSecurityService.getBaseUrl, user.getTenantId, user.getCustomerId, String.format, userCredentials.getResetToken, mailService.sendResetPasswordEmailAsync, userCredentials.getResetTokenTtl, e.getMessage

#### Dependencies
- MailService, SystemSecurityService

#### Usage Flow
Called by UI: `auth.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Check password reset token (checkResetToken)

**Endpoint:** `GET /api/noauth/resetPassword`

#### Purpose
Checks the password reset token and forwards user to 'Reset Password' page.

#### Authentication
Required: No
Expression: `None`

#### Request
- **Parameters:**
  - `resetToken` (String) in query

#### Response
- **Success:** `ResponseEntity<?>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls userService.findUserCredentialsByResetToken, userCredentials.isResetTokenExpired, rateLimitService.checkRateLimit, userCredentials.getUserId

#### Dependencies
- RateLimitService

#### Usage Flow
Called by UI: `auth.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Activate User

**Endpoint:** `POST /api/noauth/activate`

#### Purpose
Checks the activation token and updates corresponding user password in the database.

#### Authentication
Required: No
Expression: `None`

#### Request
- **Body Schema:** `ActivateUserRequest`

#### Response
- **Success:** `JwtPair`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls activateRequest.getActivateToken, activateRequest.getPassword, systemSecurityService.validatePassword, passwordEncoder.encode, userService.activateUserCredentials, userService.findUserById, credentials.getUserId, user.getEmail, credentials.isEnabled, userService.setUserCredentialsEnabled, user.getTenantId, user.getId, systemSecurityService.getBaseUrl, user.getTenantId, user.getCustomerId, String.format, user.getEmail, mailService.sendAccountActivatedEmail, e.getMessage, twoFactorAuthService.isEnforceTwoFaEnabled, securityUser.getTenantId, authenticationSuccessHandler.createMfaTokenPair, tokenFactory.createTokenPair, systemSecurityService.logLoginAction

#### Dependencies
- BCryptPasswordEncoder, JwtTokenFactory, MailService, SystemSecurityService, TwoFactorAuthService, RestAwareAuthenticationSuccessHandler

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Reset password (resetPassword)

**Endpoint:** `POST /api/noauth/resetPassword`

#### Purpose
Checks the password reset token and updates the password.

#### Authentication
Required: No
Expression: `None`

#### Request
- **Body Schema:** `ResetPasswordRequest`

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls resetPasswordRequest.getResetToken, resetPasswordRequest.getPassword, userService.findUserCredentialsByResetToken, userCredentials.isResetTokenExpired, systemSecurityService.validatePassword, passwordEncoder.matches, userCredentials.getPassword, passwordEncoder.encode, userCredentials.setPassword, userCredentials.setResetToken, userCredentials.setResetTokenExpTime, userService.replaceUserCredentials, userService.findUserById, userCredentials.getUserId, user.getEmail, userCredentials.isEnabled, systemSecurityService.getBaseUrl, user.getTenantId, user.getCustomerId, String.format, user.getEmail, mailService.sendPasswordWasResetEmail, e.getMessage, eventPublisher.publishEvent, securityUser.getId, systemSecurityService.logLoginAction, eventPublisher.publishEvent, user.getSessionId

#### Dependencies
- BCryptPasswordEncoder, MailService, SystemSecurityService, ApplicationEventPublisher

#### Usage Flow
Called by UI: `auth.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get account 2FA settings (getAccountTwoFaSettings)

**Endpoint:** `GET /api/2fa/account/settings`

#### Purpose
Get user's account 2FA configuration. Configuration contains configs for different 2FA providers.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER', 'MFA_CONFIGURATION_TOKEN')`

#### Request

#### Response
- **Success:** `AccountTwoFaSettings`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls twoFaConfigManager.getAccountTwoFaSettings, user.getTenantId

#### Dependencies
- TwoFaConfigManager

#### Usage Flow
Called by UI: `two-factor-authentication.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Generate 2FA account config (generateTwoFaAccountConfig)

**Endpoint:** `POST /api/2fa/account/config/generate`

#### Purpose
Generate new 2FA account config template for specified provider type.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER', 'MFA_CONFIGURATION_TOKEN')`

#### Request
- **Parameters:**
  - `providerType` (TwoFaProviderType) in query

#### Response
- **Success:** `TwoFaAccountConfig`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls twoFactorAuthService.generateNewAccountConfig

#### Dependencies
- TwoFactorAuthService

#### Usage Flow
Called by UI: `two-factor-authentication.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Submit 2FA account config (submitTwoFaAccountConfig)

**Endpoint:** `POST /api/2fa/account/config/submit`

#### Purpose
Submit 2FA account config to prepare for a future verification.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER', 'MFA_CONFIGURATION_TOKEN')`

#### Request
- **Body Schema:** `TwoFaAccountConfig`

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls twoFactorAuthService.prepareVerificationCode

#### Dependencies
- TwoFactorAuthService

#### Usage Flow
Called by UI: `two-factor-authentication.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Verify and save 2FA account config (verifyAndSaveTwoFaAccountConfig)

**Endpoint:** `POST /api/2fa/account/config`

#### Purpose
Checks the verification code for submitted config, and if it is correct, saves the provided account config.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER', 'MFA_CONFIGURATION_TOKEN')`

#### Request
- **Body Schema:** `TwoFaAccountConfig`

#### Response
- **Success:** `AccountTwoFaSettings`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls twoFaConfigManager.getTwoFaAccountConfig, user.getTenantId, accountConfig.getProviderType, accountConfig.getProviderType, twoFactorAuthService.checkVerificationCode, twoFaConfigManager.saveTwoFaAccountConfig, user.getTenantId

#### Dependencies
- TwoFaConfigManager, TwoFactorAuthService

#### Usage Flow
Called by UI: `two-factor-authentication.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Update 2FA account config (updateTwoFaAccountConfig)

**Endpoint:** `PUT /api/2fa/account/config`

#### Purpose
Update config for a given provider type. \n

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `providerType` (TwoFaProviderType) in query
- **Body Schema:** `TwoFaAccountConfigUpdateRequest`

#### Response
- **Success:** `AccountTwoFaSettings`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls twoFaConfigManager.getTwoFaAccountConfig, user.getTenantId, accountConfig.setUseByDefault, updateRequest.isUseByDefault, twoFaConfigManager.saveTwoFaAccountConfig, user.getTenantId

#### Dependencies
- TwoFaConfigManager

#### Usage Flow
Called by UI: `two-factor-authentication.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete 2FA account config (deleteTwoFaAccountConfig)

**Endpoint:** `DELETE /api/2fa/account/config`

#### Purpose
Delete 2FA config for a given 2FA provider type. \n

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `providerType` (TwoFaProviderType) in query

#### Response
- **Success:** `AccountTwoFaSettings`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls twoFaConfigManager.deleteTwoFaAccountConfig, user.getTenantId

#### Dependencies
- TwoFaConfigManager

#### Usage Flow
Called by UI: `two-factor-authentication.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get available 2FA providers (getAvailableTwoFaProviderTypes)

**Endpoint:** `GET /api/2fa/providers`

#### Purpose
Get the list of provider types available for user to use (the ones configured by tenant or sysadmin).\n

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER', 'MFA_CONFIGURATION_TOKEN')`

#### Request

#### Response
- **Success:** `List<TwoFaProviderType>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls twoFaConfigManager.getPlatformTwoFaSettings, Collections.emptyList, Collectors.toList

#### Dependencies
- TwoFaConfigManager

#### Usage Flow
Called by UI: `auth.service.ts, two-factor-authentication.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get platform 2FA settings (getPlatformTwoFaSettings)

**Endpoint:** `GET /api/2fa/settings`

#### Purpose
Get platform settings for 2FA. The settings are described for savePlatformTwoFaSettings API method.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN')`

#### Request

#### Response
- **Success:** `PlatformTwoFaSettings`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls twoFaConfigManager.getPlatformTwoFaSettings

#### Dependencies
- TwoFaConfigManager

#### Usage Flow
Called by UI: `two-factor-authentication.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Save platform 2FA settings (savePlatformTwoFaSettings)

**Endpoint:** `POST /api/2fa/settings`

#### Purpose
Save 2FA settings for platform. The settings have following properties:\n

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN')`

#### Request
- **Body Schema:** `PlatformTwoFaSettings`

#### Response
- **Success:** `PlatformTwoFaSettings`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls twoFaConfigManager.savePlatformTwoFaSettings

#### Dependencies
- TwoFaConfigManager

#### Usage Flow
Called by UI: `two-factor-authentication.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

## Domain: Dashboard / Widgets

### Get Widget Type Details (getWidgetTypeById)

**Endpoint:** `GET /api/widgetType/{widgetTypeId}`

#### Purpose
Get the Widget Type Details based on the provided Widget Type Id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `widgetTypeId` (String) in path

#### Response
- **Success:** `WidgetTypeDetails`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls widgetTypeDetails.setResources, tbResourceService.exportResources

#### Dependencies
- TbResourceService

#### Usage Flow
Called by UI: `entity.service.ts, widget.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Widget Type Info (getWidgetTypeInfoById)

**Endpoint:** `GET /api/widgetTypeInfo/{widgetTypeId}`

#### Purpose
Get the Widget Type Info based on the provided Widget Type Id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `widgetTypeId` (String) in path

#### Response
- **Success:** `WidgetTypeInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `widget.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Create Or Update Widget Type (saveWidgetType)

**Endpoint:** `POST /api/widgetType`

#### Purpose
Create or update the Widget Type.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Body Schema:** `WidgetTypeDetails`

#### Response
- **Success:** `WidgetTypeDetails`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls SYS_ADMIN.equals, currentUser.getAuthority, widgetTypeDetails.setTenantId, widgetTypeDetails.setTenantId, currentUser.getTenantId, widgetTypeDetails.getId, tbWidgetTypeService.save

#### Dependencies
- TbWidgetTypeService

#### Usage Flow
Called by UI: `widget.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete widget type (deleteWidgetType)

**Endpoint:** `DELETE /api/widgetType/{widgetTypeId}`

#### Purpose
Deletes the  Widget Type. Referencing non-existing Widget Type Id will cause an error.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `widgetTypeId` (String) in path

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbWidgetTypeService.delete

#### Dependencies
- TbWidgetTypeService

#### Usage Flow
Called by UI: `widget.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Widget Types (getWidgetTypes)

**Endpoint:** `GET /api/widgetTypes`

#### Purpose
Returns a page of Widget Type objects available for current user.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<WidgetTypeInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls Arrays.asList, Collections.emptyList, StringUtils.isNotEmpty, DeprecatedFilter.valueOf, WidgetTypeFilter.builder, SYS_ADMIN.equals, widgetTypeService.findSystemWidgetTypesByPageLink, widgetTypeService.findTenantWidgetTypesByTenantIdAndPageLink, widgetTypeService.findAllTenantWidgetTypesByTenantIdAndPageLink

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, widget.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getBundleWidgetTypesByBundleAlias

**Endpoint:** `GET /api/widgetTypes`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `isSystem` (boolean) in query
  - `bundleAlias` (String) in query

#### Response
- **Success:** `List<WidgetType>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls widgetsBundleService.findWidgetsBundleByTenantIdAndAlias, widgetTypeService.findWidgetTypesByWidgetsBundleId, widgetsBundle.getId

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- **DEPRECATED:** This API is marked as deprecated and should not be used in new developments.
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getBundleWidgetTypesV1

**Endpoint:** `GET /api/widgetTypes`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `widgetsBundleId` (String) in query

#### Response
- **Success:** `List<WidgetType>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls widgetTypeService.findWidgetTypesByWidgetsBundleId

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- **DEPRECATED:** This API is marked as deprecated and should not be used in new developments.
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get all Widget types for specified Bundle (getBundleWidgetTypes)

**Endpoint:** `GET /api/widgetsBundle/{widgetsBundleId}/widgetTypes`

#### Purpose
Returns an array of Widget Type objects that belong to specified Widget Bundle.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `widgetsBundleId` (String) in path

#### Response
- **Success:** `List<WidgetType>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `widget.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getBundleWidgetTypesDetailsByBundleAlias

**Endpoint:** `GET /api/widgetTypesDetails`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `isSystem` (boolean) in query
  - `bundleAlias` (String) in query

#### Response
- **Success:** `List<WidgetTypeDetails>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls widgetsBundleService.findWidgetsBundleByTenantIdAndAlias, widgetTypeService.findWidgetTypesDetailsByWidgetsBundleId, widgetsBundle.getId

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- **DEPRECATED:** This API is marked as deprecated and should not be used in new developments.
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get all Widget types details for specified Bundle (getBundleWidgetTypesDetails)

**Endpoint:** `GET /api/widgetTypesDetails`

#### Purpose
Returns an array of Widget Type Details objects that belong to specified Widget Bundle.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `widgetsBundleId` (String) in query

#### Response
- **Success:** `List<WidgetTypeDetails>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls widgetTypeService.findWidgetTypesDetailsByWidgetsBundleId, widgetTypeDetails.setResources, tbResourceService.exportResources

#### Dependencies
- TbResourceService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- **DEPRECATED:** This API is marked as deprecated and should not be used in new developments.
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get all Widget type fqns for specified Bundle (getBundleWidgetTypeFqns)

**Endpoint:** `GET /api/widgetTypeFqns`

#### Purpose
Returns an array of Widget Type fqns that belong to specified Widget Bundle.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `widgetsBundleId` (String) in query

#### Response
- **Success:** `List<String>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls widgetTypeService.findWidgetFqnsByWidgetsBundleId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `widget.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getBundleWidgetTypesInfosByBundleAlias

**Endpoint:** `GET /api/widgetTypesInfos`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `isSystem` (boolean) in query
  - `bundleAlias` (String) in query

#### Response
- **Success:** `List<WidgetTypeInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls widgetsBundleService.findWidgetsBundleByTenantIdAndAlias, widgetTypeService.findWidgetTypesInfosByWidgetsBundleId, widgetsBundle.getId

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- **DEPRECATED:** This API is marked as deprecated and should not be used in new developments.
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Widget Type Info objects (getBundleWidgetTypesInfos)

**Endpoint:** `GET /api/widgetTypesInfos`

#### Purpose
Get the Widget Type Info objects based on the provided parameters.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `widgetsBundleId` (String) in query
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<WidgetTypeInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls Arrays.asList, Collections.emptyList, StringUtils.isNotEmpty, DeprecatedFilter.valueOf, widgetTypeService.findWidgetTypesInfosByWidgetsBundleId

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- **DEPRECATED:** This API is marked as deprecated and should not be used in new developments.
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getWidgetTypeByBundleAliasAndTypeAlias

**Endpoint:** `GET /api/widgetType`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `isSystem` (boolean) in query
  - `bundleAlias` (String) in query
  - `alias` (String) in query

#### Response
- **Success:** `WidgetType`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls TenantId.fromUUID, widgetTypeService.findWidgetTypeByTenantIdAndFqn, accessControlService.checkPermission, widgetType.getId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `widget.service.ts`

#### Risks / Edge Cases
- **DEPRECATED:** This API is marked as deprecated and should not be used in new developments.
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Widget Type (getWidgetType)

**Endpoint:** `GET /api/widgetType`

#### Purpose
Get the Widget Type by FQN.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `fqn` (String) in query

#### Response
- **Success:** `WidgetType`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls fqn.split, scopeQualifier.equals, scopeQualifier.equals, TenantId.fromUUID, fqn.substring, scopeQualifier.length, widgetTypeService.findWidgetTypeByTenantIdAndFqn, accessControlService.checkPermission, widgetType.getId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, widget.service.ts`

#### Risks / Edge Cases
- **DEPRECATED:** This API is marked as deprecated and should not be used in new developments.
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get server time (getServerTime)

**Endpoint:** `GET /api/dashboard/serverTime`

#### Purpose
Get the server time (milliseconds since January 1, 1970 UTC).

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `long`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls System.currentTimeMillis

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `dashboard.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get max data points limit (getMaxDatapointsLimit)

**Endpoint:** `GET /api/dashboard/maxDatapointsLimit`

#### Purpose
Get the maximum number of data points that dashboard may request from the server per in a single subscription command.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `long`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Dashboard Info (getDashboardInfoById)

**Endpoint:** `GET /api/dashboard/info/{dashboardId}`

#### Purpose
Get the information about the dashboard based on 'dashboardId' parameter.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `DashboardInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `dashboard.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Dashboard (getDashboardById)

**Endpoint:** `GET /api/dashboard/{dashboardId}`

#### Purpose
Get the dashboard based on 'dashboardId' parameter.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls dashboard.setResources, tbResourceService.exportResources, response.setContentType, JacksonUtil.writeValueAsBytes

#### Dependencies
- TbResourceService

#### Usage Flow
Called by UI: `dashboard.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Create Or Update Dashboard (saveDashboard)

**Endpoint:** `POST /api/dashboard`

#### Purpose
Create or update the Dashboard. When creating dashboard, platform generates Dashboard Id as

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Body Schema:** `Dashboard`

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls parameters.RequestBody, dashboard.setTenantId, dashboard.getId, tbDashboardService.save, response.setContentType, JacksonUtil.writeValueAsBytes

#### Dependencies
- TbDashboardService

#### Usage Flow
Called by UI: `dashboard.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete the Dashboard (deleteDashboard)

**Endpoint:** `DELETE /api/dashboard/{dashboardId}`

#### Purpose
Delete the Dashboard.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbDashboardService.delete

#### Dependencies
- TbDashboardService

#### Usage Flow
Called by UI: `dashboard.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Assign the Dashboard (assignDashboardToCustomer)

**Endpoint:** `POST /api/customer/{customerId}/dashboard/{dashboardId}`

#### Purpose
Assign the Dashboard to specified Customer or do nothing if the Dashboard is already assigned to that Customer.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `Dashboard`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbDashboardService.assignDashboardToCustomer

#### Dependencies
- TbDashboardService

#### Usage Flow
Called by UI: `dashboard.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Unassign the Dashboard (unassignDashboardFromCustomer)

**Endpoint:** `DELETE /api/customer/{customerId}/dashboard/{dashboardId}`

#### Purpose
Unassign the Dashboard from specified Customer or do nothing if the Dashboard is already assigned to that Customer.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `Dashboard`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbDashboardService.unassignDashboardFromCustomer

#### Dependencies
- TbDashboardService

#### Usage Flow
Called by UI: `dashboard.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Update the Dashboard Customers (updateDashboardCustomers)

**Endpoint:** `POST /api/dashboard/{dashboardId}/customers`

#### Purpose
Updates the list of Customers that this Dashboard is assigned to. Removes previous assignments to customers that are not in the provided list.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `Dashboard`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbDashboardService.updateDashboardCustomers

#### Dependencies
- TbDashboardService

#### Usage Flow
Called by UI: `dashboard.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Adds the Dashboard Customers (addDashboardCustomers)

**Endpoint:** `POST /api/dashboard/{dashboardId}/customers/add`

#### Purpose
Adds the list of Customers to the existing list of assignments for the Dashboard. Keeps previous assignments to customers that are not in the provided list.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `Dashboard`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbDashboardService.addDashboardCustomers

#### Dependencies
- TbDashboardService

#### Usage Flow
Called by UI: `dashboard.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Remove the Dashboard Customers (removeDashboardCustomers)

**Endpoint:** `POST /api/dashboard/{dashboardId}/customers/remove`

#### Purpose
Removes the list of Customers from the existing list of assignments for the Dashboard. Keeps other assignments to customers that are not in the provided list.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `Dashboard`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbDashboardService.removeDashboardCustomers

#### Dependencies
- TbDashboardService

#### Usage Flow
Called by UI: `dashboard.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Assign the Dashboard to Public Customer (assignDashboardToPublicCustomer)

**Endpoint:** `POST /api/customer/public/dashboard/{dashboardId}`

#### Purpose
Assigns the dashboard to a special, auto-generated 'Public' Customer. Once assigned, unauthenticated users may browse the dashboard.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `Dashboard`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbDashboardService.assignDashboardToPublicCustomer

#### Dependencies
- TbDashboardService

#### Usage Flow
Called by UI: `dashboard.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Unassign the Dashboard from Public Customer (unassignDashboardFromPublicCustomer)

**Endpoint:** `DELETE /api/customer/public/dashboard/{dashboardId}`

#### Purpose
Unassigns the dashboard from a special, auto-generated 'Public' Customer. Once unassigned, unauthenticated users may no longer browse the dashboard.

#### Authentication
Required: Yes
Expression: `hasAuthority('SYS_ADMIN')`

#### Request

#### Response
- **Success:** `Dashboard`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbDashboardService.unassignDashboardFromPublicCustomer

#### Dependencies
- TbDashboardService

#### Usage Flow
Called by UI: `dashboard.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Tenant Dashboards by System Administrator (getTenantDashboardsByTenantId)

**Endpoint:** `GET /api/tenant/{tenantId}/dashboards`

#### Purpose
Returns a page of dashboard info objects owned by tenant.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<DashboardInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls TenantId.fromUUID, dashboardService.findDashboardsByTenantId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `dashboard.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Tenant Dashboards (getTenantDashboards)

**Endpoint:** `GET /api/tenant/dashboards`

#### Purpose
Returns a page of dashboard info objects owned by the tenant of a current user.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<DashboardInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls dashboardService.findMobileDashboardsByTenantId, dashboardService.findDashboardsByTenantId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `dashboard.service.ts, entity.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Customer Dashboards (getCustomerDashboards)

**Endpoint:** `GET /api/customer/{customerId}/dashboards`

#### Purpose
Returns a page of dashboard info objects owned by the specified customer.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<DashboardInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls dashboardService.findMobileDashboardsByTenantIdAndCustomerId, dashboardService.findDashboardsByTenantIdAndCustomerId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `dashboard.service.ts, entity.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Home Dashboard (getHomeDashboard)

**Endpoint:** `GET /api/dashboard/home`

#### Purpose
Returns the home dashboard object that is configured as 'homeDashboardId' parameter in the 'additionalInfo' of the User.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls response.setContentType, securityUser.isSystemAdmin, userService.findUserById, securityUser.getTenantId, securityUser.getId, user.getAdditionalInfo, securityUser.isCustomerUser, customerService.findCustomerById, securityUser.getTenantId, securityUser.getCustomerId, customer.getAdditionalInfo, tenantService.findTenantById, securityUser.getTenantId, tenant.getAdditionalInfo, JacksonUtil.writeValueAsBytes

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `dashboard.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Home Dashboard Info (getHomeDashboardInfo)

**Endpoint:** `GET /api/dashboard/home/info`

#### Purpose
Returns the home dashboard info object that is configured as 'homeDashboardId' parameter in the 'additionalInfo' of the User.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `HomeDashboardInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls securityUser.isSystemAdmin, userService.findUserById, securityUser.getTenantId, securityUser.getId, user.getAdditionalInfo

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Tenant Home Dashboard Info (getTenantHomeDashboardInfo)

**Endpoint:** `GET /api/tenant/dashboard/home/info`

#### Purpose
Returns the home dashboard info object that is configured as 'homeDashboardId' parameter in the 'additionalInfo' of the corresponding tenant.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `HomeDashboardInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tenantService.findTenantById, tenant.getAdditionalInfo, additionalInfo.has, additionalInfo.get, additionalInfo.get, additionalInfo.has, additionalInfo.get

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `dashboard.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Update Tenant Home Dashboard Info (getTenantHomeDashboardInfo)

**Endpoint:** `POST /api/tenant/dashboard/home/info`

#### Purpose
Update the home dashboard assignment for the current tenant.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Body Schema:** `HomeDashboardInfo`

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls homeDashboardInfo.getDashboardId, homeDashboardInfo.getDashboardId, tenantService.findTenantById, tenant.getAdditionalInfo, JacksonUtil.newObjectNode, homeDashboardInfo.getDashboardId, homeDashboardInfo.getDashboardId, homeDashboardInfo.isHideDashboardToolbar, tenant.setAdditionalInfo, tenantService.saveTenant, additionalInfo.has, additionalInfo.get, additionalInfo.get, additionalInfo.has, additionalInfo.get

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `dashboard.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Assign dashboard to edge (assignDashboardToEdge)

**Endpoint:** `POST /api/edge/{edgeId}/dashboard/{dashboardId}`

#### Purpose
Creates assignment of an existing dashboard to an instance of The Edge.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `edgeId` (String) in path

#### Response
- **Success:** `Dashboard`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbDashboardService.asignDashboardToEdge

#### Dependencies
- TbDashboardService

#### Usage Flow
Called by UI: `dashboard.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Unassign dashboard from edge (unassignDashboardFromEdge)

**Endpoint:** `DELETE /api/edge/{edgeId}/dashboard/{dashboardId}`

#### Purpose
Clears assignment of the dashboard to the edge.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `edgeId` (String) in path

#### Response
- **Success:** `Dashboard`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbDashboardService.unassignDashboardFromEdge

#### Dependencies
- TbDashboardService

#### Usage Flow
Called by UI: `dashboard.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Edge Dashboards (getEdgeDashboards)

**Endpoint:** `GET /api/edge/{edgeId}/dashboards`

#### Purpose
Returns a page of dashboard info objects assigned to the specified edge.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<DashboardInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls dashboardService.findDashboardsByTenantIdAndEdgeId, nonFilteredResult.getData, nonFilteredResult.getTotalPages, nonFilteredResult.getTotalElements, nonFilteredResult.hasNext

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `dashboard.service.ts, entity.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getDashboardsByIdsV1

**Endpoint:** `GET /api/dashboards`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `dashboardIds` (Set<UUID>) in query

#### Response
- **Success:** `List<DashboardInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls dashboardIds.add, dashboardService.findDashboardInfoByIds

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get dashboards by Dashboard Ids (getDashboardsByIds)

**Endpoint:** `GET /api/dashboards/list`

#### Purpose
Returns a list of DashboardInfo objects based on the provided ids.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `dashboardIds` (Set<UUID>) in query

#### Response
- **Success:** `List<DashboardInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls customerIds.add, UUID.fromString, dashboards.stream, accessControlService.hasPermission, dashboard.getId, Collectors.toList

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Widget Bundle (getWidgetsBundleById)

**Endpoint:** `GET /api/widgetsBundle/{widgetsBundleId}`

#### Purpose
Get the Widget Bundle based on the provided Widget Bundle Id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `widgetsBundleId` (String) in path

#### Response
- **Success:** `WidgetsBundle`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls imageService.inlineImage

#### Dependencies
- ImageService

#### Usage Flow
Called by UI: `widget.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Create Or Update Widget Bundle (saveWidgetsBundle)

**Endpoint:** `POST /api/widgetsBundle`

#### Purpose
Create or update the Widget Bundle.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Body Schema:** `WidgetsBundle`

#### Response
- **Success:** `WidgetsBundle`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls SYS_ADMIN.equals, currentUser.getAuthority, widgetsBundle.setTenantId, widgetsBundle.setTenantId, currentUser.getTenantId, widgetsBundle.getId, tbWidgetsBundleService.save

#### Dependencies
- TbWidgetsBundleService

#### Usage Flow
Called by UI: `widget.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Update widgets bundle widgets types list (updateWidgetsBundleWidgetTypes)

**Endpoint:** `POST /api/widgetsBundle/{widgetsBundleId}/widgetTypes`

#### Purpose
Updates widgets bundle widgets list.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `widgetsBundleId` (String) in path
- **Body Schema:** `List<String>`

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls currentUser.getTenantId, widgetTypeIds.contains, widgetTypeService.widgetTypeExistsByTenantIdAndWidgetTypeId, widgetTypeIds.add, tbWidgetsBundleService.updateWidgetsBundleWidgetTypes

#### Dependencies
- TbWidgetsBundleService

#### Usage Flow
Called by UI: `widget.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Update widgets bundle widgets list from widget type FQNs list (updateWidgetsBundleWidgetFqns)

**Endpoint:** `POST /api/widgetsBundle/{widgetsBundleId}/widgetTypeFqns`

#### Purpose
Updates widgets bundle widgets list from widget type FQNs list.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `widgetsBundleId` (String) in path
- **Body Schema:** `List<String>`

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbWidgetsBundleService.updateWidgetsBundleWidgetFqns

#### Dependencies
- TbWidgetsBundleService

#### Usage Flow
Called by UI: `widget.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete widgets bundle (deleteWidgetsBundle)

**Endpoint:** `DELETE /api/widgetsBundle/{widgetsBundleId}`

#### Purpose
Deletes the widget bundle. Referencing non-existing Widget Bundle Id will cause an error.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `widgetsBundleId` (String) in path

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbWidgetsBundleService.delete

#### Dependencies
- TbWidgetsBundleService

#### Usage Flow
Called by UI: `widget.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Widget Bundles (getWidgetsBundles)

**Endpoint:** `GET /api/widgetsBundles`

#### Purpose
Returns a page of Widget Bundle objects available for current user.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<WidgetsBundle>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls WidgetsBundleFilter.builder, SYS_ADMIN.equals, widgetsBundleService.findSystemWidgetsBundlesByPageLink, widgetsBundleService.findTenantWidgetsBundlesByTenantIdAndPageLink, widgetsBundleService.findAllTenantWidgetsBundlesByTenantIdAndPageLink

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, widget.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getWidgetsBundlesV1

**Endpoint:** `GET /api/widgetsBundles`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `List<WidgetsBundle>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls SYS_ADMIN.equals, widgetsBundleService.findSystemWidgetsBundles, widgetsBundleService.findAllTenantWidgetsBundlesByTenantId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `widget.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get all Widget Bundles (getAllWidgetsBundles)

**Endpoint:** `GET /api/widgetsBundles/all`

#### Purpose
Returns an array of Widget Bundle objects that are available for current user.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `List<WidgetsBundle>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `widget.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getWidgetsBundlesByIds

**Endpoint:** `GET /api/widgetsBundles`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `widgetsBundleIds` (Set<UUID>) in query

#### Response
- **Success:** `List<WidgetsBundle>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls widgetsBundleIds.add, widgetsBundleService.findSystemOrTenantWidgetsBundlesByIds

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, widget.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Widgets Bundles By Ids (getWidgetsBundlesList)

**Endpoint:** `GET /api/widgetsBundles/list`

#### Purpose
Requested widgets bundles must be system level or owned by tenant of the user which is performing the request.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `widgetsBundleIds` (Set<UUID>) in query

#### Response
- **Success:** `List<WidgetsBundle>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

## Domain: Device Management

### Get commands to publish device telemetry (getDevicePublishTelemetryCommands)

**Endpoint:** `GET /api/device-connectivity/{deviceId}`

#### Purpose
Fetch the list of commands to publish device telemetry based on device profile

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `JsonNode`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls systemSecurityService.getBaseUrl, deviceConnectivityService.findDevicePublishTelemetryCommands

#### Dependencies
- DeviceConnectivityService, SystemSecurityService

#### Usage Flow
Called by UI: `device.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Download server certificate using file path defined in device.connectivity properties (downloadServerCertificate)

**Endpoint:** `GET /api/device-connectivity/{protocol}/certificate/download`

#### Purpose
Download server certificate.

#### Authentication
Required: No
Expression: `None`

#### Request

#### Response
- **Success:** `ResponseEntity<org.springframework.core.io.Resource>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls deviceConnectivityService.getPemCertFile, ResponseEntity.ok, pemCert.contentLength

#### Dependencies
- DeviceConnectivityService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Download generated docker-compose.yml file for gateway (downloadGatewayDockerCompose)

**Endpoint:** `GET /api/device-connectivity/gateway-launch/{deviceId}/docker-compose/download`

#### Purpose
Download generated docker-compose.yml for gateway.

#### Authentication
Required: No
Expression: `None`

#### Request

#### Response
- **Success:** `ResponseEntity<org.springframework.core.io.Resource>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls systemSecurityService.getBaseUrl, deviceConnectivityService.createGatewayDockerComposeFile, ResponseEntity.ok, dockerCompose.contentLength, device.getAdditionalInfo, device.getAdditionalInfo

#### Dependencies
- DeviceConnectivityService, SystemSecurityService

#### Usage Flow
Called by UI: `device.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Device Profile (getDeviceProfileById)

**Endpoint:** `GET /api/deviceProfile/{deviceProfileId}`

#### Purpose
Fetch the Device Profile object based on the provided Device Profile Id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `DeviceProfile`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls imageService.inlineImage

#### Dependencies
- ImageService

#### Usage Flow
Called by UI: `device-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Device Profile Info (getDeviceProfileInfoById)

**Endpoint:** `GET /api/deviceProfileInfo/{deviceProfileId}`

#### Purpose
Fetch the Device Profile Info object based on the provided Device Profile Id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `DeviceProfileInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `device-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Default Device Profile (getDefaultDeviceProfileInfo)

**Endpoint:** `GET /api/deviceProfileInfo/default`

#### Purpose
Fetch the Default Device Profile Info object.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `DeviceProfileInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls deviceProfileService.findDefaultDeviceProfileInfo

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `device-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get time series keys (getDeviceProfileTimeseriesKeys)

**Endpoint:** `GET /api/deviceProfile/devices/keys/timeseries`

#### Purpose
Get a set of unique time series keys used by devices that belong to specified profile.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `List<String>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls StringUtils.isNotEmpty, UUID.fromString, timeseriesService.findAllKeysByDeviceProfileId

#### Dependencies
- TimeseriesService

#### Usage Flow
Called by UI: `device-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get attribute keys (getAttributesKeys)

**Endpoint:** `GET /api/deviceProfile/devices/keys/attributes`

#### Purpose
Get a set of unique attribute keys used by devices that belong to specified profile.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `List<String>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls StringUtils.isNotEmpty, UUID.fromString, attributesService.findAllKeysByDeviceProfileId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `device-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Create Or Update Device Profile (saveDeviceProfile)

**Endpoint:** `POST /api/deviceProfile`

#### Purpose
Create or update the Device Profile. When creating device profile, platform generates device profile id as

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Body Schema:** `DeviceProfile`

#### Response
- **Success:** `DeviceProfile`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls deviceProfile.setTenantId, deviceProfile.getId, tbDeviceProfileService.save

#### Dependencies
- TbDeviceProfileService

#### Usage Flow
Called by UI: `device-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete device profile (deleteDeviceProfile)

**Endpoint:** `DELETE /api/deviceProfile/{deviceProfileId}`

#### Purpose
Deletes the device profile. Referencing non-existing device profile Id will cause an error.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbDeviceProfileService.delete

#### Dependencies
- TbDeviceProfileService

#### Usage Flow
Called by UI: `device-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Make Device Profile Default (setDefaultDeviceProfile)

**Endpoint:** `POST /api/deviceProfile/{deviceProfileId}/default`

#### Purpose
Marks device profile as default within a tenant scope.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `DeviceProfile`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls deviceProfileService.findDefaultDeviceProfile, tbDeviceProfileService.setDefaultDeviceProfile

#### Dependencies
- TbDeviceProfileService

#### Usage Flow
Called by UI: `device-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Device Profiles (getDeviceProfiles)

**Endpoint:** `GET /api/deviceProfiles`

#### Purpose
Returns a page of devices profile objects owned by tenant.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<DeviceProfile>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls deviceProfileService.findDeviceProfiles

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, device-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Device Profiles for transport type (getDeviceProfileInfos)

**Endpoint:** `GET /api/deviceProfileInfos`

#### Purpose
Returns a page of devices profile info objects owned by tenant.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<DeviceProfileInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls deviceProfileService.findDeviceProfileInfos

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, device-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Device Profile names (getDeviceProfileNames)

**Endpoint:** `GET /api/deviceProfile/names`

#### Purpose
Returns a set of unique device profile names owned by the tenant.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `List<EntityInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls user.getTenantId, deviceProfileService.findDeviceProfileNamesByTenantId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, device-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getDeviceProfileInfosByIdsV1

**Endpoint:** `GET /api/deviceProfileInfos`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `deviceProfileIds` (Set<UUID>) in query

#### Response
- **Success:** `List<DeviceProfileInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls deviceProfileIds.add, deviceProfileService.findDeviceProfilesByIds

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Device Profile Infos By Ids (getDeviceProfileInfosByIds)

**Endpoint:** `GET /api/deviceProfileInfos/list`

#### Purpose
Requested device profiles must be owned by tenant which is performing the request.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `deviceProfileIds` (Set<UUID>) in query

#### Response
- **Success:** `List<DeviceProfileInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Device (getDeviceById)

**Endpoint:** `GET /api/device/{deviceId}`

#### Purpose
Fetch the Device object based on the provided Device Id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `Device`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `device.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Device Info (getDeviceInfoById)

**Endpoint:** `GET /api/device/info/{deviceId}`

#### Purpose
Fetch the Device Info object based on the provided Device Id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `DeviceInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `device.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Create Or Update Device (saveDevice)

**Endpoint:** `POST /api/device`

#### Purpose
Create or update the Device. When creating device, platform generates Device Id as

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Body Schema:** `Device`

#### Response
- **Success:** `Device`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls parameters.RequestBody, device.setTenantId, device.getId, device.getId, tbDeviceService.save

#### Dependencies
- TbDeviceService

#### Usage Flow
Called by UI: `device.service.ts, entity.service.ts, device-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Create Device (saveDevice) with credentials

**Endpoint:** `POST /api/device-with-credentials`

#### Purpose
Create or update the Device. When creating device, platform generates Device Id as

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Body Schema:** `SaveDeviceWithCredentialsRequest`

#### Response
- **Success:** `Device`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls deviceAndCredentials.getDevice, deviceAndCredentials.getCredentials, device.setTenantId, device.getId, tbDeviceService.saveDeviceWithCredentials

#### Dependencies
- TbDeviceService

#### Usage Flow
Called by UI: `device.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete device (deleteDevice)

**Endpoint:** `DELETE /api/device/{deviceId}`

#### Purpose
Deletes the device, it's credentials and all the relations (from and to the device). Referencing non-existing device Id will cause an error.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbDeviceService.delete

#### Dependencies
- TbDeviceService

#### Usage Flow
Called by UI: `device.service.ts, device-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Assign device to customer (assignDeviceToCustomer)

**Endpoint:** `POST /api/customer/{customerId}/device/{deviceId}`

#### Purpose
Creates assignment of the device to customer. Customer will be able to query device afterwards.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `customerId` (String) in path

#### Response
- **Success:** `Device`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbDeviceService.assignDeviceToCustomer

#### Dependencies
- TbDeviceService

#### Usage Flow
Called by UI: `device.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Unassign device from customer (unassignDeviceFromCustomer)

**Endpoint:** `DELETE /api/customer/device/{deviceId}`

#### Purpose
Clears assignment of the device to customer. Customer will not be able to query device afterwards.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `Device`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls device.getCustomerId, device.getCustomerId, device.getCustomerId, tbDeviceService.unassignDeviceFromCustomer

#### Dependencies
- TbDeviceService

#### Usage Flow
Called by UI: `device.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Make device publicly available (assignDeviceToPublicCustomer)

**Endpoint:** `POST /api/customer/public/device/{deviceId}`

#### Purpose
Device will be available for non-authorized (not logged-in) users.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `Device`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbDeviceService.assignDeviceToPublicCustomer

#### Dependencies
- TbDeviceService

#### Usage Flow
Called by UI: `device.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Device Credentials (getDeviceCredentialsByDeviceId)

**Endpoint:** `GET /api/device/{deviceId}/credentials`

#### Purpose
If during device creation there wasn't specified any credentials, platform generates random 'ACCESS_TOKEN' credentials.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `DeviceCredentials`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbDeviceService.getDeviceCredentialsByDeviceId

#### Dependencies
- TbDeviceService

#### Usage Flow
Called by UI: `device.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Update device credentials (updateDeviceCredentials)

**Endpoint:** `POST /api/device/credentials`

#### Purpose
During device creation, platform generates random 'ACCESS_TOKEN' credentials. \

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Body Schema:** `DeviceCredentials`

#### Response
- **Success:** `DeviceCredentials`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls deviceCredentials.getDeviceId, tbDeviceService.updateDeviceCredentials

#### Dependencies
- TbDeviceService

#### Usage Flow
Called by UI: `device.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Tenant Devices (getTenantDevices)

**Endpoint:** `GET /api/tenant/devices`

#### Purpose
Returns a page of devices owned by tenant.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<Device>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls type.trim, deviceService.findDevicesByTenantIdAndType, deviceService.findDevicesByTenantId

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Tenant Device Infos (getTenantDeviceInfos)

**Endpoint:** `GET /api/tenant/deviceInfos`

#### Purpose
Returns a page of devices info objects owned by tenant.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<DeviceInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls DeviceInfoFilter.builder, filter.tenantId, filter.active, type.trim, filter.type, deviceProfileId.length, filter.deviceProfileId, deviceService.findDeviceInfosByFilter, filter.build

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `device.service.ts, entity.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getTenantDevice

**Endpoint:** `GET /api/tenant/devices`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `deviceName` (String) in query

#### Response
- **Success:** `Device`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls deviceService.findDeviceByTenantIdAndName

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `device.service.ts, entity.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Tenant Device (getTenantDeviceByName)

**Endpoint:** `GET /api/tenant/device`

#### Purpose
Requested device must be owned by tenant that the user belongs to.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `deviceName` (String) in query

#### Response
- **Success:** `Device`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Customer Devices (getCustomerDevices)

**Endpoint:** `GET /api/customer/{customerId}/devices`

#### Purpose
Returns a page of devices objects assigned to customer.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<Device>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls type.trim, deviceService.findDevicesByTenantIdAndCustomerIdAndType, deviceService.findDevicesByTenantIdAndCustomerId

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Customer Device Infos (getCustomerDeviceInfos)

**Endpoint:** `GET /api/customer/{customerId}/deviceInfos`

#### Purpose
Returns a page of devices info objects assigned to customer.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `customerId` (String) in path
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<DeviceInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls DeviceInfoFilter.builder, filter.tenantId, filter.customerId, filter.active, type.trim, filter.type, deviceProfileId.length, filter.deviceProfileId, deviceService.findDeviceInfosByFilter, filter.build

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `device.service.ts, entity.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Devices By Ids (getDevicesByIds)

**Endpoint:** `GET /api/devices`

#### Purpose
Requested devices must be owned by tenant or assigned to customer which user is performing the request.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `List<Device>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls user.getTenantId, user.getCustomerId, deviceIds.add, customerId.isNullUid, deviceService.findDevicesByTenantIdAndIdsAsync, deviceService.findDevicesByTenantIdCustomerIdAndIdsAsync, devices.get

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `device.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Find related devices (findDevicesByQuery)

**Endpoint:** `POST /api/devices`

#### Purpose
Returns all devices that are related to the specific entity.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Body Schema:** `DeviceSearchQuery`

#### Response
- **Success:** `List<Device>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls query.getParameters, query.getDeviceTypes, query.getParameters, deviceService.findDevicesByQuery, devices.stream, accessControlService.checkPermission, device.getId, Collectors.toList

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `device.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Device Types (getDeviceTypes)

**Endpoint:** `GET /api/device/types`

#### Purpose
Deprecated. See 'getDeviceProfileNames' API from Device Profile Controller instead.

#### Authentication
Required: Yes
Expression: `hasAuthority('CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `List<EntitySubtype>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls user.getTenantId, deviceService.findDeviceTypesByTenantId, deviceTypes.get

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `device.service.ts`

#### Risks / Edge Cases
- **DEPRECATED:** This API is marked as deprecated and should not be used in new developments.
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Claim device (claimDevice)

**Endpoint:** `POST /api/customer/device/{deviceName}/claim`

#### Purpose
Claiming makes it possible to assign a device to the specific customer using device/server side claiming data (in the form of secret key).

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Body Schema:** `ClaimRequest`

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls user.getTenantId, user.getCustomerId, deviceService.findDeviceByTenantIdAndName, accessControlService.checkPermission, device.getId, tbDeviceService.claimDevice, Futures.addCallback, result.getResponse, deferredResult.setResult, deferredResult.setResult, result.getResponse, deferredResult.setResult, deferredResult.setErrorResult, MoreExecutors.directExecutor

#### Dependencies
- TbDeviceService

#### Usage Flow
Called by UI: `device.service.ts`

#### Risks / Edge Cases
- **DEPRECATED:** This API is marked as deprecated and should not be used in new developments.
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Reclaim device (reClaimDevice)

**Endpoint:** `DELETE /api/customer/device/{deviceName}/claim`

#### Purpose
Reclaiming means the device will be unassigned from the customer and the device will be available for claiming again.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls user.getTenantId, deviceService.findDeviceByTenantIdAndName, accessControlService.checkPermission, device.getId, tbDeviceService.reclaimDevice, Futures.addCallback, deferredResult.setResult, deferredResult.setErrorResult, MoreExecutors.directExecutor, claimRequest.getSecretKey

#### Dependencies
- TbDeviceService

#### Usage Flow
Called by UI: `device.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Assign device to tenant (assignDeviceToTenant)

**Endpoint:** `POST /api/tenant/{tenantId}/device/{deviceId}`

#### Purpose
Creates assignment of the device to tenant. Thereafter tenant will be able to reassign the device to a customer.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `Device`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls TenantId.fromUUID, tenantService.findTenantById, tbDeviceService.assignDeviceToTenant

#### Dependencies
- TbDeviceService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Assign device to edge (assignDeviceToEdge)

**Endpoint:** `POST /api/edge/{edgeId}/device/{deviceId}`

#### Purpose
Creates assignment of an existing device to an instance of The Edge.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `Device`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbDeviceService.assignDeviceToEdge

#### Dependencies
- TbDeviceService

#### Usage Flow
Called by UI: `device.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Unassign device from edge (unassignDeviceFromEdge)

**Endpoint:** `DELETE /api/edge/{edgeId}/device/{deviceId}`

#### Purpose
Clears assignment of the device to the edge.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `Device`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbDeviceService.unassignDeviceFromEdge

#### Dependencies
- TbDeviceService

#### Usage Flow
Called by UI: `device.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get devices assigned to edge (getEdgeDevices)

**Endpoint:** `GET /api/edge/{edgeId}/devices`

#### Purpose
Returns a page of devices assigned to edge.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<DeviceInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls DeviceInfoFilter.builder, filter.tenantId, filter.edgeId, filter.active, type.trim, filter.type, deviceProfileId.length, filter.deviceProfileId, deviceService.findDeviceInfosByFilter, filter.build

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `device.service.ts, entity.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Count devices by device profile  (countByDeviceProfileAndEmptyOtaPackage)

**Endpoint:** `GET /api/devices/count/{otaPackageType}/{deviceProfileId}`

#### Purpose
The platform gives an ability to load OTA (over-the-air) packages to devices.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `otaPackageType` (String) in path
  - `deviceProfileId` (String) in path

#### Response
- **Success:** `Long`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls deviceService.countDevicesByTenantIdAndDeviceProfileIdAndEmptyOtaPackage, UUID.fromString, OtaPackageType.valueOf

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `ota-package.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Import the bulk of devices (processDevicesBulkImport)

**Endpoint:** `POST /api/device/bulk_import`

#### Purpose
There's an ability to import the bulk of devices using the only .csv file.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request
- **Body Schema:** `BulkImportRequest`

#### Response
- **Success:** `BulkImportResult<Device>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls deviceBulkImportService.processBulkImport

#### Dependencies
- DeviceBulkImportService

#### Usage Flow
Called by UI: `device.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

## Domain: Entity Relations

### saveRelationV1

**Endpoint:** `POST /api/relation`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Body Schema:** `EntityRelation`

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity-relation.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Create Relation (saveRelation)

**Endpoint:** `POST /api/v2/relation`

#### Purpose
Creates or updates a relation between two entities in the platform.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Body Schema:** `EntityRelation`

#### Response
- **Success:** `EntityRelation`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls relation.getTypeGroup, relation.setTypeGroup, ConstraintValidator.validateFields, relation.getFrom, relation.getTo, tbEntityRelationService.save

#### Dependencies
- TbEntityRelationService

#### Usage Flow
Called by UI: `entity-relation.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### deleteRelationV1

**Endpoint:** `DELETE /api/relation`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity-relation.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete Relation (deleteRelation)

**Endpoint:** `DELETE /api/v2/relation`

#### Purpose
Deletes a relation between two entities in the platform.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN','TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `EntityRelation`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls EntityIdFactory.getByTypeAndId, EntityIdFactory.getByTypeAndId, tbEntityRelationService.delete

#### Dependencies
- TbEntityRelationService

#### Usage Flow
Called by UI: `entity-relation.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete common relations (deleteRelations)

**Endpoint:** `DELETE /api/relations`

#### Purpose
Deletes all the relations ('from' and 'to' direction) for the specified entity and relation type group: 'COMMON'.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `entityId` (String) in query
  - `entityType` (String) in query

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls EntityIdFactory.getByTypeAndId, tbEntityRelationService.deleteCommonRelations

#### Dependencies
- TbEntityRelationService

#### Usage Flow
Called by UI: `entity-relation.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Relation (getRelation)

**Endpoint:** `GET /api/relation`

#### Purpose
Returns relation object between two specified entities if present. Otherwise throws exception.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `EntityRelation`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls EntityIdFactory.getByTypeAndId, EntityIdFactory.getByTypeAndId, relationService.getRelation

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity-relation.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### findByFrom

**Endpoint:** `GET /api/relations`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `List<EntityRelation>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls EntityIdFactory.getByTypeAndId, relationService.findByFrom

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity-relation.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get List of Relations (findEntityRelationsByFrom)

**Endpoint:** `GET /api/relations/from/{fromType}/{fromId}`

#### Purpose
Returns list of relation objects for the specified entity by the 'from' direction.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `List<EntityRelation>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### findInfoByFrom

**Endpoint:** `GET /api/relations/info`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `List<EntityRelationInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls EntityIdFactory.getByTypeAndId, relationService.findInfoByFrom

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity-relation.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get List of Relation Infos (findEntityRelationInfosByFrom)

**Endpoint:** `GET /api/relations/info/from/{fromType}/{fromId}`

#### Purpose
Returns list of relation info objects for the specified entity by the 'from' direction.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `List<EntityRelationInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### findByFrom

**Endpoint:** `GET /api/relations`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `List<EntityRelation>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls EntityIdFactory.getByTypeAndId, relationService.findByFromAndType

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity-relation.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get List of Relations (findEntityRelationsByFromAndRelationType)

**Endpoint:** `GET /api/relations/from/{fromType}/{fromId}/{relationType}`

#### Purpose
Returns list of relation objects for the specified entity by the 'from' direction and relation type.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `List<EntityRelation>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### findByTo

**Endpoint:** `GET /api/relations`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `List<EntityRelation>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls EntityIdFactory.getByTypeAndId, relationService.findByTo

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity-relation.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get List of Relations (findEntityRelationsByTo)

**Endpoint:** `GET /api/relations/to/{toType}/{toId}`

#### Purpose
Returns list of relation objects for the specified entity by the 'to' direction.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `List<EntityRelation>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### findInfoByTo

**Endpoint:** `GET /api/relations/info`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `List<EntityRelationInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls EntityIdFactory.getByTypeAndId, relationService.findInfoByTo

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity-relation.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get List of Relation Infos (findEntityRelationInfosByTo)

**Endpoint:** `GET /api/relations/info/to/{toType}/{toId}`

#### Purpose
Returns list of relation info objects for the specified entity by the 'to' direction.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `List<EntityRelationInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### findByTo

**Endpoint:** `GET /api/relations`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `List<EntityRelation>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls EntityIdFactory.getByTypeAndId, relationService.findByToAndType

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity-relation.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get List of Relations (findEntityRelationsByToAndRelationType)

**Endpoint:** `GET /api/relations/to/{toType}/{toId}/{relationType}`

#### Purpose
Returns list of relation objects for the specified entity by the 'to' direction and relation type.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `List<EntityRelation>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Find related entities (findEntityRelationsByQuery)

**Endpoint:** `POST /api/relations`

#### Purpose
Returns all entities that are related to the specific entity.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Body Schema:** `EntityRelationsQuery`

#### Response
- **Success:** `List<EntityRelation>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls query.getParameters, query.getFilters, query.getParameters, relationService.findByQuery

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity-relation.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Find related entity infos (findEntityRelationInfosByQuery)

**Endpoint:** `POST /api/relations/info`

#### Purpose
Returns all entity infos that are related to the specific entity.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Body Schema:** `EntityRelationsQuery`

#### Response
- **Success:** `List<EntityRelationInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls query.getParameters, query.getFilters, query.getParameters, relationService.findInfoByQuery, currentUser.isTenantAdmin, currentUser.getTenantId, relationsByQuery.stream, relationByQuery.getTo, relationByQuery.getFrom, StringUtils.isBlank, RelationTypeGroup.valueOf

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity-relation.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

## Domain: Files / Uploads

### Download Resource (downloadResource)

**Endpoint:** `GET /api/resource/{resourceId}/download`

#### Purpose
Download Resource based on the provided Resource Id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `ResponseEntity<ByteArrayResource>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbResource.getData, ResponseEntity.ok, tbResource.getFileName, tbResource.getFileName, resource.contentLength

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `device.service.ts, image.service.ts, resource.service.ts, ota-package.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Download resource (downloadResourceIfChanged)

**Endpoint:** `GET /api/resource/{resourceType}/{scope}/{key}`

#### Purpose
Download resource with a given type and key for the given scope

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `resourceType` (String) in path
  - `scope` (String) in path
  - `key` (String) in path

#### Response
- **Success:** `ResponseEntity<ByteArrayResource>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls ResourceType.valueOf, resourceTypeStr.toUpperCase

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `resource.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Download LWM2M Resource (downloadLwm2mResourceIfChanged)

**Endpoint:** `GET /api/resource/lwm2m/{resourceId}/download`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `ResponseEntity<ByteArrayResource>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Download PKCS_12 Resource (downloadPkcs12ResourceIfChanged)

**Endpoint:** `GET /api/resource/pkcs12/{resourceId}/download`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `ResponseEntity<ByteArrayResource>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Download JKS Resource (downloadJksResourceIfChanged)

**Endpoint:** `GET /api/resource/jks/{resourceId}/download`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `ResponseEntity<ByteArrayResource>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Download JS Resource (downloadJsResourceIfChanged)

**Endpoint:** `GET /api/resource/js/{resourceId}/download`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `ResponseEntity<ByteArrayResource>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Resource Info (getResourceInfoById)

**Endpoint:** `GET /api/resource/info/{resourceId}`

#### Purpose
Fetch the Resource Info object based on the provided Resource Id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `TbResourceInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `resource.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get resource info (getResourceInfo)

**Endpoint:** `GET /api/resource/{resourceType}/{scope}/{key}/info`

#### Purpose
Get info for the resource with the given type, scope and key.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `resourceType` (String) in path
  - `scope` (String) in path
  - `key` (String) in path

#### Response
- **Success:** `TbResourceInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls ResourceType.valueOf, resourceTypeStr.toUpperCase

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `resource.service.ts`

#### Risks / Edge Cases
- **DEPRECATED:** This API is marked as deprecated and should not be used in new developments.
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Resource (getResourceById)

**Endpoint:** `GET /api/resource/{resourceId}`

#### Purpose
Fetch the Resource object based on the provided Resource Id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `TbResource`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `resource.service.ts, device-profile.service.ts`

#### Risks / Edge Cases
- **DEPRECATED:** This API is marked as deprecated and should not be used in new developments.
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Create Or Update Resource (saveResource)

**Endpoint:** `POST /api/resource`

#### Purpose
Create or update the Resource. When creating the Resource, platform generates Resource id as

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Body Schema:** `TbResource`

#### Response
- **Success:** `TbResourceInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls resource.setTenantId, resource.getId, tbResourceService.save

#### Dependencies
- TbResourceService

#### Usage Flow
Called by UI: `resource.service.ts`

#### Risks / Edge Cases
- **DEPRECATED:** This API is marked as deprecated and should not be used in new developments.
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Upload Resource via Multipart File (uploadResource)

**Endpoint:** `POST /api/resource/upload`

#### Purpose
Create the Resource using multipart file upload.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `TbResourceInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls resource.setTenantId, resource.setTitle, StringUtils.isNotEmpty, file.getOriginalFilename, ResourceType.valueOf, resource.setResourceType, StringUtils.isNotEmpty, resource.setDescriptor, JacksonUtil.toJsonNode, resourceType.getMediaType, resourceType.getMediaType, file.getContentType, resource.setDescriptor, JacksonUtil.newObjectNode, StringUtils.isNotEmpty, resource.setResourceSubType, ResourceSubType.valueOf, resource.setFileName, file.getOriginalFilename, resource.setData, file.getBytes, resource.getId, tbResourceService.save

#### Dependencies
- TbResourceService

#### Usage Flow
Called by UI: `resource.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### updateResourceData

**Endpoint:** `PUT /api/resource/{id}/data`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `id` (UUID) in path

#### Response
- **Success:** `TbResourceInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls resource.setFileName, file.getOriginalFilename, resource.setData, file.getBytes, tbResourceService.save

#### Dependencies
- TbResourceService

#### Usage Flow
Called by UI: `resource.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### updateResourceInfo

**Endpoint:** `PUT /api/resource/{id}/info`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `id` (UUID) in path
- **Body Schema:** `TbResourceInfo`

#### Response
- **Success:** `TbResourceInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls resourceInfo.setId, tbResourceService.save

#### Dependencies
- TbResourceService

#### Usage Flow
Called by UI: `resource.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Resource Infos (getResources)

**Endpoint:** `GET /api/resource`

#### Purpose
Returns a page of Resource Info objects owned by tenant or sysadmin.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<TbResourceInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls TbResourceInfoFilter.builder, filter.tenantId, StringUtils.isNotEmpty, resourceTypes.add, ResourceType.valueOf, StringUtils.isNotEmpty, filter.resourceSubTypes, Set.of, ResourceSubType.valueOf, Collections.addAll, ResourceType.values, resourceTypes.remove, resourceTypes.remove, resourceTypes.remove, filter.resourceTypes, SYS_ADMIN.equals, resourceService.findTenantResourcesByTenantId, filter.build, resourceService.findAllTenantResourcesByTenantId, filter.build

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, resource.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getSystemOrTenantResourcesByIdsV1

**Endpoint:** `GET /api/resource`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `resourceIds` (Set<UUID>) in query

#### Response
- **Success:** `List<TbResourceInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls resourceIds.add, resourceService.findSystemOrTenantResourcesByIds, user.getTenantId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `resource.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Resource Infos by ids (getSystemOrTenantResourcesByIds)

**Endpoint:** `GET /api/resource/list`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `resourceIds` (Set<UUID>) in query

#### Response
- **Success:** `List<TbResourceInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get All Resource Infos (getTenantResources)

**Endpoint:** `GET /api/resource/tenant`

#### Purpose
Returns a page of Resource Info objects owned by tenant.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<TbResourceInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls TbResourceInfoFilter.builder, EnumSet.allOf, resourceService.findTenantResourcesByTenantId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `resource.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get LwM2M Objects (getLwm2mListObjectsPage)

**Endpoint:** `GET /api/resource/lwm2m/page`

#### Purpose
Returns a page of LwM2M objects parsed from Resources with type 'LWM2M_MODEL' owned by tenant or sysadmin.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `List<LwM2mObject>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbResourceService.findLwM2mObjectPage

#### Dependencies
- TbResourceService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get LwM2M Objects (getLwm2mListObjects)

**Endpoint:** `GET /api/resource/lwm2m`

#### Purpose
Returns a page of LwM2M objects parsed from Resources with type 'LWM2M_MODEL' owned by tenant or sysadmin.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `sortOrder` (String) in query
  - `sortProperty` (String) in query

#### Response
- **Success:** `List<LwM2mObject>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbResourceService.findLwM2mObject

#### Dependencies
- TbResourceService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete Resource (deleteResource)

**Endpoint:** `DELETE /api/resource/{resourceId}`

#### Purpose
Deletes the Resource. Referencing non-existing Resource Id will cause an error.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `resourceId` (String) in path

#### Response
- **Success:** `ResponseEntity<TbResourceDeleteResult>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbResourceService.delete, tbResourceDeleteResult.isSuccess, ResponseEntity.ok, ResponseEntity.badRequest, resourceInfoProvider.get, StringUtils.remove, etag.equals, resourceInfo.getEtag, ResponseEntity.status, resourceInfo.getEtag, resourceService.getResourceData, resourceInfo.getTenantId, resourceInfo.getId, ResponseEntity.ok, resourceInfo.getFileName, resourceInfo.getFileName, resource.contentLength, resourceInfo.getResourceType, CacheControl.noCache, resourceInfo.getEtag, scope.equals, scope.equals, resourceService.findResourceInfoByTenantIdAndKey

#### Dependencies
- TbResourceService

#### Usage Flow
Called by UI: `resource.service.ts, device-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### uploadImage

**Endpoint:** `POST /api/image`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `TbResourceInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls image.setTenantId, user.getTenantId, accessControlService.checkPermission, resourceValidator.validateResourceSize, user.getTenantId, file.getSize, image.setFileName, file.getOriginalFilename, StringUtils.isNotEmpty, image.setTitle, image.setTitle, file.getOriginalFilename, StringUtils.isNotEmpty, ResourceSubType.valueOf, image.setResourceType, image.setResourceSubType, descriptor.setMediaType, file.getContentType, image.setDescriptorValue, image.setData, file.getBytes, image.setPublic, tbImageService.save

#### Dependencies
- TbImageService, ResourceDataValidator

#### Usage Flow
Called by UI: `image.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### updateImage

**Endpoint:** `PUT /`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `type` (String) in path
  - `key` (String) in path

#### Response
- **Success:** `TbResourceInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls resourceValidator.validateResourceSize, imageInfo.getId, file.getSize, image.setData, file.getBytes, image.setFileName, file.getOriginalFilename, image.updateDescriptor, descriptor.setMediaType, file.getContentType, tbImageService.save

#### Dependencies
- TbImageService, ResourceDataValidator

#### Usage Flow
Called by UI: `device.service.ts, event.service.ts, image.service.ts, entity-view.service.ts, asset.service.ts, device-profile.service.ts, entity.service.ts, dashboard.service.ts, edge.service.ts, auth.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### updateImageInfo

**Endpoint:** `PUT /`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `type` (String) in path
  - `key` (String) in path
- **Body Schema:** `TbResourceInfo`

#### Response
- **Success:** `TbResourceInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls newImageInfo.setTitle, request.getTitle, tbImageService.save

#### Dependencies
- TbImageService

#### Usage Flow
Called by UI: `device.service.ts, event.service.ts, image.service.ts, entity-view.service.ts, asset.service.ts, device-profile.service.ts, entity.service.ts, dashboard.service.ts, edge.service.ts, auth.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### updateImagePublicStatus

**Endpoint:** `PUT /`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `type` (String) in path
  - `key` (String) in path
  - `isPublic` (boolean) in path

#### Response
- **Success:** `TbResourceInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls newImageInfo.setPublic, tbImageService.save

#### Dependencies
- TbImageService

#### Usage Flow
Called by UI: `device.service.ts, event.service.ts, image.service.ts, entity-view.service.ts, asset.service.ts, device-profile.service.ts, entity.service.ts, dashboard.service.ts, edge.service.ts, auth.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### downloadImage

**Endpoint:** `GET /`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `type` (String) in path
  - `key` (String) in path

#### Response
- **Success:** `ResponseEntity<ByteArrayResource>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `device.service.ts, event.service.ts, image.service.ts, entity-view.service.ts, asset.service.ts, device-profile.service.ts, entity.service.ts, dashboard.service.ts, edge.service.ts, auth.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### downloadPublicImage

**Endpoint:** `GET /api/images/public/{publicResourceKey}`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `publicResourceKey` (String) in path

#### Response
- **Success:** `ResponseEntity<ByteArrayResource>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls ImageCacheKey.forPublicImage, imageService.getPublicImageInfoByKey

#### Dependencies
- ImageService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### exportImage

**Endpoint:** `GET /`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `type` (String) in path
  - `key` (String) in path

#### Response
- **Success:** `ResourceExportData`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls imageService.exportImage

#### Dependencies
- ImageService

#### Usage Flow
Called by UI: `device.service.ts, event.service.ts, image.service.ts, entity-view.service.ts, asset.service.ts, device-profile.service.ts, entity.service.ts, dashboard.service.ts, edge.service.ts, auth.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### importImage

**Endpoint:** `PUT /api/image/import`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Body Schema:** `ResourceExportData`

#### Response
- **Success:** `TbResourceInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbImageService.importImage

#### Dependencies
- TbImageService

#### Usage Flow
Called by UI: `image.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### downloadImagePreview

**Endpoint:** `GET /`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `type` (String) in path
  - `key` (String) in path

#### Response
- **Success:** `ResponseEntity<ByteArrayResource>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `device.service.ts, event.service.ts, entity-view.service.ts, asset.service.ts, device-profile.service.ts, entity.service.ts, dashboard.service.ts, edge.service.ts, auth.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getImageInfo

**Endpoint:** `GET /`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `type` (String) in path
  - `key` (String) in path

#### Response
- **Success:** `TbResourceInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `device.service.ts, event.service.ts, image.service.ts, entity-view.service.ts, asset.service.ts, device-profile.service.ts, entity.service.ts, dashboard.service.ts, edge.service.ts, auth.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getImages

**Endpoint:** `GET /api/images`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<TbResourceInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls StringUtils.isNotEmpty, ResourceSubType.valueOf, imageService.getImagesByTenantId, imageService.getAllImagesByTenantId

#### Dependencies
- ImageService

#### Usage Flow
Called by UI: `image.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### deleteImage

**Endpoint:** `DELETE /`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `type` (String) in path
  - `key` (String) in path

#### Response
- **Success:** `ResponseEntity<TbImageDeleteResult>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbImageService.delete, result.isSuccess, ResponseEntity.ok, ResponseEntity.badRequest, ImageCacheKey.forImage, StringUtils.isNotEmpty, StringUtils.remove, etag.equals, tbImageService.getETag, imageInfoSupplier.get, imageInfo.getFileName, imageInfo.getDescriptor, cacheKey.isPreview, descriptor.getPreviewDescriptor, imageService.getImagePreview, imageInfo.getTenantId, imageInfo.getId, imageService.getImageData, imageInfo.getTenantId, imageInfo.getId, tbImageService.putETag, descriptor.getEtag, ResponseEntity.ok, descriptor.getMediaType, descriptor.getEtag, cacheKey.isPublic, imageInfo.getTenantId, result.cacheControl, CacheControl.maxAge, imageInfo.getTenantId, result.cacheControl, CacheControl.maxAge, result.cacheControl, CacheControl.noCache, descriptor.getMediaType, StringUtils.isNotEmpty, acceptEncodingHeader.contains, result.header, gzipOutputStream.write, gzipOutputStream.finish, outputStream.toByteArray, result.contentLength, result.body, imageService.getImageInfoByTenantIdAndKey, imageType.equals, imageType.equals

#### Dependencies
- ImageService, TbImageService

#### Usage Flow
Called by UI: `device.service.ts, event.service.ts, image.service.ts, entity-view.service.ts, asset.service.ts, device-profile.service.ts, entity.service.ts, dashboard.service.ts, edge.service.ts, auth.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

## Domain: Internal / System APIs

### Count Entities by Query

**Endpoint:** `POST /api/entitiesQuery/count`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Body Schema:** `EntityCountQuery`

#### Response
- **Success:** `long`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls entityQueryService.countEntitiesByQuery

#### Dependencies
- EntityQueryService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Find Entity Data by Query

**Endpoint:** `POST /api/entitiesQuery/find`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Body Schema:** `EntityDataQuery`

#### Response
- **Success:** `PageData<EntityData>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls entityQueryService.findEntityDataByQuery

#### Dependencies
- EntityQueryService

#### Usage Flow
Called by UI: `entity.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Find Alarms by Query

**Endpoint:** `POST /api/alarmsQuery/find`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Body Schema:** `AlarmDataQuery`

#### Response
- **Success:** `PageData<AlarmData>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls query.getPageLink, query.getPageLink, entityQueryService.findAlarmDataByQuery

#### Dependencies
- EntityQueryService

#### Usage Flow
Called by UI: `entity.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Count Alarms by Query (countAlarmsByQuery)

**Endpoint:** `POST /api/alarmsQuery/count`

#### Purpose
Returns the number of alarms that match the query definition.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Body Schema:** `AlarmCountQuery`

#### Response
- **Success:** `long`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls query.getAssigneeId, entityQueryService.countAlarmsByQuery

#### Dependencies
- EntityQueryService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- **DEPRECATED:** This API is marked as deprecated and should not be used in new developments.
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Find Available Entity Keys by Query (deprecated)

**Endpoint:** `POST /api/entitiesQuery/find/keys`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `timeseries` (boolean) in query
  - `attributes` (boolean) in query
- **Body Schema:** `EntityDataQuery`

#### Response
- **Success:** `DeferredResult<AvailableEntityKeys>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls query.getPageLink, pageLink.getPageSize, pageLink.setPageSize, entityQueryService.getKeysByQuery

#### Dependencies
- EntityQueryService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- **DEPRECATED:** This API is marked as deprecated and should not be used in new developments.
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Find Available Entity Keys By Query

**Endpoint:** `POST /api/v2/entitiesQuery/find/keys`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN')`

#### Request
- **Body Schema:** `EntityDataQuery`

#### Response
- **Success:** `DeferredResult<AvailableEntityKeysV2>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls query.getPageLink, pageLink.getPageSize, pageLink.setPageSize, entityQueryService.findAvailableEntityKeysByQuery

#### Dependencies
- EntityQueryService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### processSystemEdqsRequest

**Endpoint:** `POST /api/edqs/system/request`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN')`

#### Request
- **Body Schema:** `ToCoreEdqsRequest`

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls edqsService.processSystemRequest

#### Dependencies
- EdqsService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getEdqsState

**Endpoint:** `GET /api/edqs/state`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN')`

#### Request

#### Response
- **Success:** `EdqsState`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls edqsService.getState, query.getEntityFilter, user.getCustomerId, customerId.isNullUid, EntityFilter.resolveEntityFilter, query.getEntityFilter, user.getId

#### Dependencies
- EdqsService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get entity view (getEntityViewById)

**Endpoint:** `GET /api/entityView/{entityViewId}`

#### Purpose
Fetch the EntityView object based on the provided entity view id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `EntityView`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity-view.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Entity View info (getEntityViewInfoById)

**Endpoint:** `GET /api/entityView/info/{entityViewId}`

#### Purpose
Fetch the Entity View info object based on the provided Entity View Id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `EntityViewInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity-view.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Save or update entity view (saveEntityView)

**Endpoint:** `POST /api/entityView`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Body Schema:** `EntityView`

#### Response
- **Success:** `EntityView`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls entityView.setTenantId, entityView.getId, entityView.getId, tbEntityViewService.save

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity-view.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete entity view (deleteEntityView)

**Endpoint:** `DELETE /api/entityView/{entityViewId}`

#### Purpose
Delete the EntityView object based on the provided entity view id.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbEntityViewService.delete

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity-view.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getTenantEntityView

**Endpoint:** `GET /api/tenant/entityViews`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `entityViewName` (String) in query

#### Response
- **Success:** `EntityView`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls entityViewService.findEntityViewByTenantIdAndName

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, entity-view.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Entity View by name (getTenantEntityViewByName)

**Endpoint:** `GET /api/tenant/entityView`

#### Purpose
Fetch the Entity View object based on the tenant id and entity view name.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `entityViewName` (String) in query

#### Response
- **Success:** `EntityView`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Assign Entity View to customer (assignEntityViewToCustomer)

**Endpoint:** `POST /api/customer/{customerId}/entityView/{entityViewId}`

#### Purpose
Creates assignment of the Entity View to customer. Customer will be able to query Entity View afterwards.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `EntityView`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbEntityViewService.assignEntityViewToCustomer

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity-view.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Unassign Entity View from customer (unassignEntityViewFromCustomer)

**Endpoint:** `DELETE /api/customer/entityView/{entityViewId}`

#### Purpose
Clears assignment of the Entity View to customer. Customer will not be able to query Entity View afterwards.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `EntityView`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls entityView.getCustomerId, entityView.getCustomerId, entityView.getCustomerId, tbEntityViewService.unassignEntityViewFromCustomer

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity-view.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Customer Entity Views (getCustomerEntityViews)

**Endpoint:** `GET /api/customer/{customerId}/entityViews`

#### Purpose
Returns a page of Entity View objects assigned to customer.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<EntityView>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls type.trim, entityViewService.findEntityViewsByTenantIdAndCustomerIdAndType, entityViewService.findEntityViewsByTenantIdAndCustomerId

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Customer Entity View info (getCustomerEntityViewInfos)

**Endpoint:** `GET /api/customer/{customerId}/entityViewInfos`

#### Purpose
Returns a page of Entity View info objects assigned to customer.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<EntityViewInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls type.trim, entityViewService.findEntityViewInfosByTenantIdAndCustomerIdAndType, entityViewService.findEntityViewInfosByTenantIdAndCustomerId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, entity-view.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Tenant Entity Views (getTenantEntityViews)

**Endpoint:** `GET /api/tenant/entityViews`

#### Purpose
Returns a page of entity views owned by tenant.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<EntityView>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls type.trim, entityViewService.findEntityViewByTenantIdAndType, entityViewService.findEntityViewByTenantId

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Tenant Entity Views (getTenantEntityViews)

**Endpoint:** `GET /api/tenant/entityViewInfos`

#### Purpose
Returns a page of entity views info owned by tenant.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<EntityViewInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls type.trim, entityViewService.findEntityViewInfosByTenantIdAndType, entityViewService.findEntityViewInfosByTenantId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, entity-view.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Find related entity views (findEntityViewsByQuery)

**Endpoint:** `POST /api/entityViews`

#### Purpose
Returns all entity views that are related to the specific entity.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Body Schema:** `EntityViewSearchQuery`

#### Response
- **Success:** `List<EntityView>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls query.getParameters, query.getEntityViewTypes, query.getParameters, entityViewService.findEntityViewsByQuery

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity-view.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Entity View Types (getEntityViewTypes)

**Endpoint:** `GET /api/entityView/types`

#### Purpose
Returns a set of unique entity view types based on entity views that are either owned by the tenant or assigned to the customer which user is performing the request.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `List<EntitySubtype>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls user.getTenantId, entityViewService.findEntityViewTypesByTenantId, entityViewTypes.get

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, entity-view.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Make entity view publicly available (assignEntityViewToPublicCustomer)

**Endpoint:** `POST /api/customer/public/entityView/{entityViewId}`

#### Purpose
Entity View will be available for non-authorized (not logged-in) users.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `EntityView`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbEntityViewService.assignEntityViewToPublicCustomer

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity-view.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Assign entity view to edge (assignEntityViewToEdge)

**Endpoint:** `POST /api/edge/{edgeId}/entityView/{entityViewId}`

#### Purpose
Creates assignment of an existing entity view to an instance of The Edge.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `EntityView`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbEntityViewService.assignEntityViewToEdge

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity-view.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Unassign entity view from edge (unassignEntityViewFromEdge)

**Endpoint:** `DELETE /api/edge/{edgeId}/entityView/{entityViewId}`

#### Purpose
Clears assignment of the entity view to the edge.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `EntityView`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbEntityViewService.unassignEntityViewFromEdge, entityView.getCustomerId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity-view.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getEdgeEntityViews

**Endpoint:** `GET /api/edge/{edgeId}/entityViews`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<EntityView>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls type.trim, entityViewService.findEntityViewsByTenantIdAndEdgeIdAndType, entityViewService.findEntityViewsByTenantIdAndEdgeId, nonFilteredResult.getData, nonFilteredResult.getTotalPages, nonFilteredResult.getTotalElements, nonFilteredResult.hasNext

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, entity-view.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getEntityViewsByIdsV1

**Endpoint:** `GET /api/entityViews`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `entityViewIds` (Set<UUID>) in query

#### Response
- **Success:** `List<EntityView>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls entityViewIds.add, entityViewService.findEntityViewsByTenantIdAndIds

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity-view.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Entity Views By Ids (getEntityViewsByIds)

**Endpoint:** `GET /api/entityViews/list`

#### Purpose
Requested entity views must be owned by tenant or assigned to customer which user is performing the request.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `entityViewIds` (Set<UUID>) in query

#### Response
- **Success:** `List<EntityView>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls entityViews.stream, accessControlService.hasPermission, entityView.getId, Collectors.toList

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Events by type (getEventsByType)

**Endpoint:** `GET /api/events/{entityType}/{entityId}/{eventType}`

#### Purpose
Returns a page of events for specified entity by specifying event type.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `eventType` (String) in path
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<EventInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls TenantId.fromUUID, EntityIdFactory.getByTypeAndId, eventService.findEvents

#### Dependencies
- EventService

#### Usage Flow
Called by UI: `event.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getEventsDeprecated

**Endpoint:** `GET /api/events/{entityType}/{entityId}`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `tenantId` (String) in query
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<EventInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls TenantId.fromUUID, EntityIdFactory.getByTypeAndId, eventService.findEvents

#### Dependencies
- EventService

#### Usage Flow
Called by UI: `event.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Events by event filter (getEventsByFilter)

**Endpoint:** `POST /api/events/{entityType}/{entityId}`

#### Purpose
Returns a page of events for the chosen entity by specifying the event filter.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query
- **Body Schema:** `EventFilter`

#### Response
- **Success:** `PageData<EventInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls TenantId.fromUUID, EntityIdFactory.getByTypeAndId, eventService.findEventsByFilter

#### Dependencies
- EventService

#### Usage Flow
Called by UI: `event.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Clear Events (clearEvents)

**Endpoint:** `POST /api/events/{entityType}/{entityId}/clear`

#### Purpose
Clears events by filter for specified entity.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Body Schema:** `EventFilter`

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls EntityIdFactory.getByTypeAndId, eventService.removeEvents, EventType.values, et.name, et.getOldName

#### Dependencies
- EventService

#### Usage Flow
Called by UI: `event.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Create or update AI model (saveAiModel)

**Endpoint:** `POST /api/ai/model`

#### Purpose
Creates or updates an AI model record.\n\n

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `AiModel`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls model.setTenantId, user.getTenantId, model.getId, tbAiModelService.save

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `ai-model.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get AI model by ID (getAiModelById)

**Endpoint:** `GET /api/ai/model/{modelUuid}`

#### Purpose
Fetches an AI model record by its `id`.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `modelUuid` (UUID) in path

#### Response
- **Success:** `AiModel`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, ai-model.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get AI models (getAiModels)

**Endpoint:** `GET /api/ai/model`

#### Purpose
Returns a page of AI models.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<AiModel>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, aiModelService.findAiModelsByTenantId, user.getTenantId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, ai-model.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete AI model by ID (deleteAiModelById)

**Endpoint:** `DELETE /api/ai/model/{modelUuid}`

#### Purpose
Deletes the AI model record by its `id`.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `modelUuid` (UUID) in path

#### Response
- **Success:** `boolean`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, aiModelService.findAiModelByTenantIdAndId, user.getTenantId, toDelete.isEmpty, accessControlService.checkPermission, toDelete.get, tbAiModelService.delete, toDelete.get

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `ai-model.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Send request to AI chat model (sendChatRequest)

**Endpoint:** `POST /api/ai/model/chat`

#### Purpose
Submits a single prompt - made up of an optional system message and a required user message - to the specified AI chat model

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Body Schema:** `TbChatRequest`

#### Response
- **Success:** `DeferredResult<TbChatResponse>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbChatRequest.toLangChainChatRequest, tbChatRequest.chatModelConfig, aiChatModelService.sendChatRequestAsync, TbChatResponse.Success, chatResponse.aiMessage, TbChatResponse.Failure, ex.getMessage, chatModelConfig.timeoutSeconds, Duration.ofSeconds

#### Dependencies
- AiChatModelService

#### Usage Flow
Called by UI: `ai-model.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Queue Stats entities (getTenantQueueStats)

**Endpoint:** `GET /api/queueStats`

#### Purpose
Returns a page of queue stats objects that are designed to collect queue statistics for every service.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<QueueStats>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls queueStatsService.findByTenantId

#### Dependencies
- QueueStatsService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Queue stats entity by id (getQueueStatsById)

**Endpoint:** `GET /api/queueStats/{queueStatsId}`

#### Purpose
Fetch the Queue stats object based on the provided Queue stats id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `queueStatsId` (String) in path

#### Response
- **Success:** `QueueStats`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls UUID.fromString, queueStatsService.findQueueStatsById

#### Dependencies
- QueueStatsService

#### Usage Flow
Called by UI: `queue.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getQueueStatsByIdsV1

**Endpoint:** `GET /api/queueStats`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `List<QueueStats>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls queueStatsIds.add, queueStatsService.findQueueStatsByIds

#### Dependencies
- QueueStatsService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get QueueStats By Ids (getQueueStatsByIds)

**Endpoint:** `GET /api/queueStats/list`

#### Purpose
Fetch the Queue stats objects based on the provided ids.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `List<QueueStats>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getJobById

**Endpoint:** `GET /api/job/{id}`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `id` (UUID) in path

#### Response
- **Success:** `Job`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getJobs

**Endpoint:** `GET /api/jobs`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<Job>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls JobFilter.builder, jobService.findJobsByFilter

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### cancelJob

**Endpoint:** `POST /api/job/{id}/cancel`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `id` (UUID) in path

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls jobManager.cancelJob

#### Dependencies
- JobManager

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### reprocessJob

**Endpoint:** `POST /api/job/{id}/reprocess`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `id` (UUID) in path

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls jobManager.reprocessJob

#### Dependencies
- JobManager

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### deleteJob

**Endpoint:** `DELETE /api/job/{id}`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `id` (UUID) in path

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls jobService.deleteJob

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get audit logs by customer id (getAuditLogsByCustomerId)

**Endpoint:** `GET /api/audit/logs/customer/{customerId}`

#### Purpose
Returns a page of audit logs related to the targeted customer entities (devices, assets, etc.),

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `customerId` (String) in path
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<AuditLog>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls auditLogService.findAuditLogsByTenantIdAndCustomerId, UUID.fromString

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `audit-log.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get audit logs by user id (getAuditLogsByUserId)

**Endpoint:** `GET /api/audit/logs/user/{userId}`

#### Purpose
Returns a page of audit logs related to the actions of targeted user.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `userId` (String) in path
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<AuditLog>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls auditLogService.findAuditLogsByTenantIdAndUserId, UUID.fromString

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `audit-log.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get audit logs by entity id (getAuditLogsByEntityId)

**Endpoint:** `GET /api/audit/logs/entity/{entityType}/{entityId}`

#### Purpose
Returns a page of audit logs related to the actions on the targeted entity.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `entityType` (String) in path
  - `entityId` (String) in path
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<AuditLog>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls auditLogService.findAuditLogsByTenantIdAndEntityId, EntityIdFactory.getByTypeAndId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `audit-log.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get all audit logs (getAuditLogs)

**Endpoint:** `GET /api/audit/logs`

#### Purpose
Returns a page of audit logs related to all entities in the scope of the current user's Tenant.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<AuditLog>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls auditLogService.findAuditLogsByTenantId, StringUtils.isNoneBlank, actionTypesStr.split, Arrays.stream, ActionType.valueOf, at.toUpperCase, Collectors.toList, System.currentTimeMillis

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `audit-log.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Component Descriptor (getComponentDescriptorByClazz)

**Endpoint:** `GET /api/component/{componentDescriptorClazz:.+}`

#### Purpose
Gets the Component Descriptor object using class name from the path parameters.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN','TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `componentDescriptorClazz` (String) in path

#### Response
- **Success:** `ComponentDescriptor`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `component-descriptor.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Component Descriptors (getComponentDescriptorsByType)

**Endpoint:** `GET /api/components/{componentType}`

#### Purpose
Gets the Component Descriptors using rule node type and optional rule chain type request parameters.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN','TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `componentType` (String) in path

#### Response
- **Success:** `List<ComponentDescriptor>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls ComponentType.valueOf

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `component-descriptor.service.ts, rule-chain.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Component Descriptors (getComponentDescriptorsByTypes)

**Endpoint:** `GET /api/components`

#### Purpose
Gets the Component Descriptors using coma separated list of rule node types and optional rule chain type request parameters.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN','TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `List<ComponentDescriptor>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls componentTypes.add, ComponentType.valueOf, StringUtils.isEmpty, RuleChainType.valueOf

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `component-descriptor.service.ts, rule-chain.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Send one-way RPC request (handleOneWayDeviceRPCRequestV1)

**Endpoint:** `POST /oneway/{deviceId}/oneway/{deviceId}`

#### Purpose
Deprecated. See 'Rpc V 2 Controller' instead.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `deviceId` (String) in path
- **Body Schema:** `String`

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls parameters.RequestBody, UUID.fromString

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- **DEPRECATED:** This API is marked as deprecated and should not be used in new developments.
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Send two-way RPC request (handleTwoWayDeviceRPCRequestV1)

**Endpoint:** `POST /oneway/{deviceId}/twoway/{deviceId}`

#### Purpose
Deprecated. See 'Rpc V 2 Controller' instead.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `deviceId` (String) in path
- **Body Schema:** `String`

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls parameters.RequestBody, UUID.fromString

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- **DEPRECATED:** This API is marked as deprecated and should not be used in new developments.
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Queues (getTenantQueuesByServiceType)

**Endpoint:** `GET /api/queues`

#### Purpose
Returns a page of queues registered in the platform.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `serviceType` (String) in query
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<Queue>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls ServiceType.of, queueService.findQueuesByTenantId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `queue.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Queue (getQueueById)

**Endpoint:** `GET /api/queues/{queueId}`

#### Purpose
Fetch the Queue object based on the provided Queue Id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `queueId` (String) in path

#### Response
- **Success:** `Queue`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls UUID.fromString, queueService.findQueueById

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `queue.service.ts, entity.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Queue (getQueueByName)

**Endpoint:** `GET /api/queues/name/{queueName}`

#### Purpose
Fetch the Queue object based on the provided Queue name.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN')`

#### Request
- **Parameters:**
  - `queueName` (String) in path

#### Response
- **Success:** `Queue`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls queueService.findQueueByTenantIdAndName

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `queue.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Create Or Update Queue (saveQueue)

**Endpoint:** `POST /api/queues`

#### Purpose
Create or update the Queue. When creating queue, platform generates Queue Id as

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN')`

#### Request
- **Parameters:**
  - `serviceType` (String) in query
- **Body Schema:** `Queue`

#### Response
- **Success:** `Queue`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls queue.setTenantId, queue.getId, ServiceType.of, queue.setTenantId, tbQueueService.saveQueue

#### Dependencies
- TbQueueService

#### Usage Flow
Called by UI: `queue.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete Queue (deleteQueue)

**Endpoint:** `DELETE /api/queues/{queueId}`

#### Purpose
Deletes the Queue.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN')`

#### Request
- **Parameters:**
  - `queueId` (String) in path

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbQueueService.deleteQueue

#### Dependencies
- TbQueueService

#### Usage Flow
Called by UI: `queue.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Send one-way RPC request (handleOneWayDeviceRPCRequestV2)

**Endpoint:** `POST /oneway/{deviceId}/oneway/{deviceId}`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `deviceId` (String) in path
- **Body Schema:** `String`

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls parameters.RequestBody, UUID.fromString

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Send two-way RPC request (handleTwoWayDeviceRPCRequestV2)

**Endpoint:** `POST /oneway/{deviceId}/twoway/{deviceId}`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Body Schema:** `String`

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls parameters.RequestBody, UUID.fromString

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get persistent RPC request

**Endpoint:** `GET /oneway/{deviceId}/persistent/{rpcId}`

#### Purpose
Get information about the status of the RPC call.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `Rpc`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls UUID.fromString

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `device.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get persistent RPC requests

**Endpoint:** `GET /oneway/{deviceId}/persistent/device/{deviceId}`

#### Purpose
Allows to query RPC calls for specific device using pagination.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls rpcStatus.equals, UUID.fromString, accessValidator.validate, rpcService.findAllByDeviceIdAndStatus, rpcService.findAllByDeviceId, response.setResult, response.setResult

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete persistent RPC

**Endpoint:** `DELETE /oneway/{deviceId}/persistent/{rpcId}`

#### Purpose
Deletes the persistent RPC request.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls UUID.fromString, rpc.getStatus, rpc.getDeviceId, rpc.getUuidId, rpc.getDeviceId, tbClusterService.pushMsgToCore, rpcService.deleteRpc, rpc.setStatus, TbMsg.newMsg, rpc.getDeviceId, JacksonUtil.toString, tbClusterService.pushMsgToRuleEngine, rpc.getDeviceId

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Create Or Update Calculated Field (saveCalculatedField)

**Endpoint:** `POST /api/calculatedField`

#### Purpose
Creates or Updates the Calculated Field. When creating calculated field, platform generates Calculated Field Id as

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request
- **Body Schema:** `CalculatedField`

#### Response
- **Success:** `CalculatedField`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls parameters.RequestBody, calculatedField.setTenantId, calculatedField.getEntityId, calculatedField.getConfiguration, tbCalculatedFieldService.save

#### Dependencies
- TbCalculatedFieldService

#### Usage Flow
Called by UI: `calculated-fields.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Calculated Field (getCalculatedFieldById)

**Endpoint:** `GET /api/calculatedField/{calculatedFieldId}`

#### Purpose
Fetch the Calculated Field object based on the provided Calculated Field Id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `CalculatedField`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbCalculatedFieldService.findById, calculatedField.getEntityId

#### Dependencies
- TbCalculatedFieldService

#### Usage Flow
Called by UI: `calculated-fields.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getCalculatedFieldsByEntityIdV1

**Endpoint:** `GET /api/{entityType}/{entityId}/calculatedFields`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `entityType` (String) in path
  - `entityId` (String) in path
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<CalculatedField>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls EntityIdFactory.getByTypeAndUuid, tbCalculatedFieldService.findByTenantIdAndEntityId

#### Dependencies
- TbCalculatedFieldService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Calculated Fields by Entity Id (getCalculatedFieldsByEntityId)

**Endpoint:** `GET /api/calculatedField/{entityType}/{entityId}`

#### Purpose
Fetch the Calculated Fields based on the provided Entity Id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `entityType` (String) in path
  - `entityId` (String) in path
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<CalculatedField>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `calculated-fields.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get calculated fields (getCalculatedFields)

**Endpoint:** `GET /api/calculatedFields`

#### Purpose
Fetch tenant calculated fields based on the filter.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<CalculatedFieldInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls CollectionUtils.isEmpty, EnumSet.allOf, types.remove, SUPPORTED_ENTITIES.keySet, EnumSet.of, CalculatedFieldFilter.builder, Optional.ofNullable, params.get, calculatedFieldService.findCalculatedFieldsByTenantIdAndFilter, user.getTenantId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `calculated-fields.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get calculated field names (getCalculatedFieldNames)

**Endpoint:** `GET /api/calculatedFields/names`

#### Purpose
Fetch the list of calculated field names for specified type.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `type` (CalculatedFieldType) in query
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<String>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls calculatedFieldService.findCalculatedFieldNamesByTenantIdAndType

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `calculated-fields.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete Calculated Field (deleteCalculatedField)

**Endpoint:** `DELETE /api/calculatedField/{calculatedFieldId}`

#### Purpose
Deletes the calculated field. Referencing non-existing Calculated Field Id will cause an error.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbCalculatedFieldService.findById, calculatedField.getEntityId, tbCalculatedFieldService.delete

#### Dependencies
- TbCalculatedFieldService

#### Usage Flow
Called by UI: `calculated-fields.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get latest calculated field debug event (getLatestCalculatedFieldDebugEvent)

**Endpoint:** `GET /api/calculatedField/{calculatedFieldId}/debug`

#### Purpose
Gets latest calculated field debug event for specified calculated field id.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `JsonNode`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbCalculatedFieldService.findById, calculatedField.getEntityId, Optional.ofNullable, eventService.findLatestEvents, events.stream

#### Dependencies
- TbCalculatedFieldService, EventService

#### Usage Flow
Called by UI: `calculated-fields.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Test Script expression

**Endpoint:** `POST /api/calculatedField/testScript`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Body Schema:** `JsonNode`

#### Response
- **Success:** `JsonNode`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls parameters.RequestBody, inputParams.has, inputParams.get, tbCalculatedFieldService.executeTestScript

#### Dependencies
- TbCalculatedFieldService

#### Usage Flow
Called by UI: `calculated-fields.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Save entities version (saveEntitiesVersion)

**Endpoint:** `POST /api/entities/vc/version`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Body Schema:** `VersionCreateRequest`

#### Response
- **Success:** `DeferredResult<UUID>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, versionControlService.saveEntitiesVersion

#### Dependencies
- EntitiesVersionControlService

#### Usage Flow
Called by UI: `entities-version-control.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get version create request status (getVersionCreateRequestStatus)

**Endpoint:** `GET /api/entities/vc/version/{requestId}/status`

#### Purpose
No description provided in source.

#### Authentication
Required: No
Expression: `None`

#### Request
- **Parameters:**
  - `requestId` (UUID) in path

#### Response
- **Success:** `VersionCreationResult`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, versionControlService.getVersionCreateStatus

#### Dependencies
- EntitiesVersionControlService

#### Usage Flow
Called by UI: `entities-version-control.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### List entity versions (listEntityVersions)

**Endpoint:** `GET /api/entities/vc/version/{entityType}/{externalEntityUuid}`

#### Purpose
No description provided in source.

#### Authentication
Required: No
Expression: `None`

#### Request
- **Parameters:**
  - `entityType` (EntityType) in path
  - `externalEntityUuid` (UUID) in path
  - `branch` (String) in query
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `DeferredResult<PageData<EntityVersion>>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, EntityIdFactory.getByTypeAndUuid, versionControlService.listEntityVersions

#### Dependencies
- EntitiesVersionControlService

#### Usage Flow
Called by UI: `entities-version-control.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### List entity type versions (listEntityTypeVersions)

**Endpoint:** `GET /api/entities/vc/version/{entityType}`

#### Purpose
No description provided in source.

#### Authentication
Required: No
Expression: `None`

#### Request
- **Parameters:**
  - `entityType` (EntityType) in path
  - `branch` (String) in query
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `DeferredResult<PageData<EntityVersion>>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, versionControlService.listEntityTypeVersions

#### Dependencies
- EntitiesVersionControlService

#### Usage Flow
Called by UI: `entities-version-control.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### List all versions (listVersions)

**Endpoint:** `GET /api/entities/vc/version`

#### Purpose
No description provided in source.

#### Authentication
Required: No
Expression: `None`

#### Request
- **Parameters:**
  - `branch` (String) in query
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `DeferredResult<PageData<EntityVersion>>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, versionControlService.listVersions

#### Dependencies
- EntitiesVersionControlService

#### Usage Flow
Called by UI: `entities-version-control.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### List entities at version (listEntitiesAtVersion)

**Endpoint:** `GET /api/entities/vc/entity/{entityType}/{versionId}`

#### Purpose
No description provided in source.

#### Authentication
Required: No
Expression: `None`

#### Request
- **Parameters:**
  - `entityType` (EntityType) in path
  - `versionId` (String) in path

#### Response
- **Success:** `DeferredResult<List<VersionedEntityInfo>>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, versionControlService.listEntitiesAtVersion

#### Dependencies
- EntitiesVersionControlService

#### Usage Flow
Called by UI: `entities-version-control.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### List all entities at version (listAllEntitiesAtVersion)

**Endpoint:** `GET /api/entities/vc/entity/{versionId}`

#### Purpose
No description provided in source.

#### Authentication
Required: No
Expression: `None`

#### Request
- **Parameters:**
  - `versionId` (String) in path

#### Response
- **Success:** `DeferredResult<List<VersionedEntityInfo>>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, versionControlService.listAllEntitiesAtVersion

#### Dependencies
- EntitiesVersionControlService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get entity data info (getEntityDataInfo)

**Endpoint:** `GET /api/entities/vc/info/{versionId}/{entityType}/{externalEntityUuid}`

#### Purpose
No description provided in source.

#### Authentication
Required: No
Expression: `None`

#### Request
- **Parameters:**
  - `versionId` (String) in path
  - `entityType` (EntityType) in path
  - `externalEntityUuid` (UUID) in path

#### Response
- **Success:** `DeferredResult<EntityDataInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, EntityIdFactory.getByTypeAndUuid, versionControlService.getEntityDataInfo

#### Dependencies
- EntitiesVersionControlService

#### Usage Flow
Called by UI: `entities-version-control.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Compare entity data to version (compareEntityDataToVersion)

**Endpoint:** `GET /api/entities/vc/diff/{entityType}/{internalEntityUuid}`

#### Purpose
No description provided in source.

#### Authentication
Required: No
Expression: `None`

#### Request
- **Parameters:**
  - `entityType` (EntityType) in path
  - `internalEntityUuid` (UUID) in path
  - `versionId` (String) in query

#### Response
- **Success:** `DeferredResult<EntityDataDiff>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, EntityIdFactory.getByTypeAndUuid, versionControlService.compareEntityDataToVersion

#### Dependencies
- EntitiesVersionControlService

#### Usage Flow
Called by UI: `entities-version-control.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Load entities version (loadEntitiesVersion)

**Endpoint:** `POST /api/entities/vc/entity`

#### Purpose
No description provided in source.

#### Authentication
Required: No
Expression: `None`

#### Request
- **Body Schema:** `VersionLoadRequest`

#### Response
- **Success:** `UUID`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, versionControlService.loadEntitiesVersion

#### Dependencies
- EntitiesVersionControlService

#### Usage Flow
Called by UI: `entities-version-control.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get version load request status (getVersionLoadRequestStatus)

**Endpoint:** `GET /api/entities/vc/entity/{requestId}/status`

#### Purpose
No description provided in source.

#### Authentication
Required: No
Expression: `None`

#### Request
- **Parameters:**
  - `requestId` (UUID) in path

#### Response
- **Success:** `VersionLoadResult`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, versionControlService.getVersionLoadStatus

#### Dependencies
- EntitiesVersionControlService

#### Usage Flow
Called by UI: `entities-version-control.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### List branches (listBranches)

**Endpoint:** `GET /api/entities/vc/branches`

#### Purpose
No description provided in source.

#### Authentication
Required: No
Expression: `None`

#### Request

#### Response
- **Success:** `DeferredResult<List<BranchInfo>>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, versionControlService.listBranches, Futures.transform, versionControlService.getVersionControlSettings, StringUtils.isNotEmpty, remoteBranches.stream, infos.add, infos.addAll, remoteBranches.stream, b.equals, b.getName, Collectors.toList, MoreExecutors.directExecutor

#### Dependencies
- EntitiesVersionControlService

#### Usage Flow
Called by UI: `entities-version-control.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### isReady

**Endpoint:** `GET /api/edqs/ready`

#### Purpose
No description provided in source.

#### Authentication
Required: No
Expression: `None`

#### Request

#### Response
- **Success:** `ResponseEntity<Void>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls edqsStateService.isReady, ResponseEntity.ok, ResponseEntity.badRequest

#### Dependencies
- EdqsStateService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

## Domain: Mobile App

### Get mobile app login info (getLoginMobileInfo)

**Endpoint:** `GET /api/noauth/mobile`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN','TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `pkgName` (String) in query
  - `platform` (PlatformType) in query

#### Response
- **Success:** `LoginMobileInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls oAuth2ClientService.findOAuth2ClientLoginInfosByMobilePkgNameAndPlatformType, mobileAppService.findMobileAppByPkgNameAndPlatformType, Optional.ofNullable, Optional.ofNullable

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get user mobile app basic info (getUserMobileInfo)

**Endpoint:** `GET /api/mobile`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pkgName` (String) in query
  - `platform` (PlatformType) in query

#### Response
- **Success:** `UserMobileInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls userService.findUserById, securityUser.getTenantId, securityUser.getId, securityUser.isSystemAdmin, user.getAdditionalInfo, mobileAppBundleService.findMobileAppBundleByPkgNameAndPlatform, securityUser.getTenantId, mobileAppService.findMobileAppByPkgNameAndPlatformType, Optional.ofNullable, Optional.ofNullable

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Save Or update Mobile app (saveMobileApp)

**Endpoint:** `POST /api/mobile/app`

#### Purpose
Create or update the Mobile app. When creating mobile app, platform generates Mobile App Id as

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `MobileApp`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls mobileApp.setTenantId, mobileApp.getId, tbMobileAppService.save

#### Dependencies
- TbMobileAppService

#### Usage Flow
Called by UI: `mobile-app.service.ts, mobile-application.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get mobile app infos (getTenantMobileApps)

**Endpoint:** `GET /api/mobile/app`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<MobileApp>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls mobileAppService.findMobileAppsByTenantId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `mobile-app.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get mobile info by id (getMobileAppById)

**Endpoint:** `GET /api/mobile/app/{id}`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `id` (UUID) in path

#### Response
- **Success:** `MobileApp`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `mobile-app.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete Mobile App by ID (deleteMobileApp)

**Endpoint:** `DELETE /api/mobile/app/{id}`

#### Purpose
Deletes Mobile App by ID. Referencing non-existing mobile app Id will cause an error.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `id` (UUID) in path

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbMobileAppService.delete, mobileAppBundle.getLayoutConfig, mobileAppBundle.getLayoutConfig, Collectors.toList, JacksonUtil.toJsonNode, JacksonUtil.writeValueAsViewIgnoringNullFields

#### Dependencies
- TbMobileAppService

#### Usage Flow
Called by UI: `mobile-app.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Save Or update Mobile app bundle (saveMobileAppBundle)

**Endpoint:** `POST /api/mobile/bundle`

#### Purpose
Create or update the Mobile app bundle that represents tha pair of ANDROID and IOS app and

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `MobileAppBundle`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls mobileAppBundle.setTenantId, mobileAppBundle.getId, tbMobileAppBundleService.save

#### Dependencies
- TbMobileAppBundleService

#### Usage Flow
Called by UI: `mobile-app.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Update oauth2 clients (updateMobileAppBundleOauth2Clients)

**Endpoint:** `PUT /api/mobile/bundle/{id}/oauth2Clients`

#### Purpose
Update oauth2 clients of the specified mobile app bundle.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `id` (UUID) in path

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbMobileAppBundleService.updateOauth2Clients

#### Dependencies
- TbMobileAppBundleService

#### Usage Flow
Called by UI: `mobile-app.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get mobile app bundle infos (getTenantMobileAppBundleInfos)

**Endpoint:** `GET /api/mobile/bundle/infos`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<MobileAppBundleInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls mobileAppBundleService.findMobileAppBundleInfosByTenantId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `mobile-app.service.ts, entity.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get mobile app bundle info by id (getMobileAppBundleInfoById)

**Endpoint:** `GET /api/mobile/bundle/info/{id}`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `id` (UUID) in path

#### Response
- **Success:** `MobileAppBundleInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `mobile-app.service.ts, entity.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete Mobile App Bundle by ID (deleteMobileAppBundle)

**Endpoint:** `DELETE /api/mobile/bundle/{id}`

#### Purpose
Deletes Mobile App Bundle by ID. Referencing non-existing mobile app bundle Id will cause an error.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `id` (UUID) in path

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbMobileAppBundleService.delete

#### Dependencies
- TbMobileAppBundleService

#### Usage Flow
Called by UI: `mobile-app.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

## Domain: Notifications

### Save notification target (saveNotificationTarget)

**Endpoint:** `POST /api/notification/target`

#### Purpose
Creates or updates notification target.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `NotificationTarget`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls notificationTarget.setTenantId, user.getTenantId, notificationTarget.getId, notificationTarget.getConfiguration, targetConfig.getType

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `notification.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get notification target by id (getNotificationTargetById)

**Endpoint:** `GET /api/notification/target/{id}`

#### Purpose
Fetches notification target by id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `id` (UUID) in path

#### Response
- **Success:** `NotificationTarget`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `notification.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get recipients for notification target config (getRecipientsForNotificationTargetConfig)

**Endpoint:** `POST /api/notification/target/recipients`

#### Purpose
Returns the page of recipients for such notification target configuration.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query
- **Body Schema:** `NotificationTarget`

#### Response
- **Success:** `PageData<User>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls notificationTarget.getConfiguration, targetConfig.getType, notificationTargetService.findRecipientsForNotificationTargetConfig, user.getTenantId, notificationTarget.getConfiguration

#### Dependencies
- NotificationTargetService

#### Usage Flow
Called by UI: `notification.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getNotificationTargetsByIdsV1

**Endpoint:** `GET /api/notification/targets`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `List<NotificationTarget>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls Arrays.stream, Collectors.toList, notificationTargetService.findNotificationTargetsByTenantIdAndIds, user.getTenantId

#### Dependencies
- NotificationTargetService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get notification targets by ids (getNotificationTargetsByIds)

**Endpoint:** `GET /api/notification/targets/list`

#### Purpose
Returns the list of notification targets found by provided ids.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `List<NotificationTarget>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, notification.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get notification targets (getNotificationTargets)

**Endpoint:** `GET /api/notification/targets`

#### Purpose
Returns the page of notification targets owned by sysadmin or tenant.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<NotificationTarget>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls notificationTargetService.findNotificationTargetsByTenantId, user.getTenantId

#### Dependencies
- NotificationTargetService

#### Usage Flow
Called by UI: `entity.service.ts, notification.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getNotificationTargetsBySupportedNotificationTypeV1

**Endpoint:** `GET /api/notification/targets`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<NotificationTarget>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls notificationTargetService.findNotificationTargetsByTenantIdAndSupportedNotificationType, user.getTenantId

#### Dependencies
- NotificationTargetService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get notification targets by supported notification type (getNotificationTargetsBySupportedNotificationType)

**Endpoint:** `GET /api/notification/targets/notificationType/{notificationType}`

#### Purpose
Returns the page of notification targets filtered by notification type that they can be used for.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `notificationType` (NotificationType) in path
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<NotificationTarget>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete notification target by id (deleteNotificationTargetById)

**Endpoint:** `DELETE /api/notification/target/{id}`

#### Purpose
Deletes notification target by its id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `id` (UUID) in path

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls user.isSystemAdmin, usersFilter.getType, CollectionUtils.isNotEmpty, CollectionUtils.isNotEmpty

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `notification.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Save notification rule (saveNotificationRule)

**Endpoint:** `POST /api/notification/rule`

#### Purpose
Creates or updates notification rule.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `NotificationRule`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls notificationRule.setTenantId, user.getTenantId, notificationRule.getId, notificationRule.getTriggerType, user.isTenantAdmin, triggerType.isTenantLevel, user.isSystemAdmin, triggerType.isTenantLevel

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `notification.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get notification rule by id (getNotificationRuleById)

**Endpoint:** `GET /api/notification/rule/{id}`

#### Purpose
Fetches notification rule info by rule's id.\n

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `id` (UUID) in path

#### Response
- **Success:** `NotificationRuleInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `notification.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get notification rules (getNotificationRules)

**Endpoint:** `GET /api/notification/rules`

#### Purpose
Returns the page of notification rules.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<NotificationRuleInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls notificationRuleService.findNotificationRulesInfosByTenantId, user.getTenantId

#### Dependencies
- NotificationRuleService

#### Usage Flow
Called by UI: `entity.service.ts, notification.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete notification rule (deleteNotificationRule)

**Endpoint:** `DELETE /api/notification/rule/{id}`

#### Purpose
Deletes notification rule by id.\n

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `id` (UUID) in path

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `notification.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get notifications (getNotifications)

**Endpoint:** `GET /api/notifications`

#### Purpose
Returns the page of notifications for current user.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<Notification>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls notificationService.findNotificationsByRecipientIdAndReadStatus, user.getTenantId, user.getId

#### Dependencies
- NotificationService

#### Usage Flow
Called by UI: `notification.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get unread notifications count (getUnreadNotificationsCount)

**Endpoint:** `GET /api/notifications/unread/count`

#### Purpose
Returns unread notifications count for chosen delivery method.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `Integer`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls notificationService.countUnreadNotificationsByRecipientId, user.getTenantId, user.getId

#### Dependencies
- NotificationService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Mark notification as read (markNotificationAsRead)

**Endpoint:** `PUT /api/notification/{id}/read`

#### Purpose
Marks notification as read by its id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `id` (UUID) in path

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls notificationCenter.markNotificationAsRead, user.getTenantId, user.getId

#### Dependencies
- NotificationCenter

#### Usage Flow
Called by UI: `notification.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Mark all notifications as read (markAllNotificationsAsRead)

**Endpoint:** `PUT /api/notifications/read`

#### Purpose
Marks all unread notifications as read.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls notificationCenter.markAllNotificationsAsRead, user.getTenantId, user.getId

#### Dependencies
- NotificationCenter

#### Usage Flow
Called by UI: `notification.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete notification (deleteNotification)

**Endpoint:** `DELETE /api/notification/{id}`

#### Purpose
Deletes notification by its id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `id` (UUID) in path

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls notificationCenter.deleteNotification, user.getTenantId, user.getId

#### Dependencies
- NotificationCenter

#### Usage Flow
Called by UI: `notification.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Create notification request (createNotificationRequest)

**Endpoint:** `POST /api/notification/request`

#### Purpose
Processes notification request.\n

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `NotificationRequest`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls notificationRequest.getId, notificationRequest.setTenantId, user.getTenantId, notificationRequest.getId, notificationRequest.getTargets, notificationRequest.setOriginatorEntityId, user.getId, notificationRequest.setInfo, notificationRequest.setRuleId, notificationRequest.setStatus, notificationRequest.setStats, notificationCenter.processNotificationRequest

#### Dependencies
- NotificationCenter

#### Usage Flow
Called by UI: `notification.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Send entity limit increase request notification to System administrators (sendEntitiesLimitIncreaseRequest)

**Endpoint:** `POST /api/notification/entitiesLimitIncreaseRequest/{entityType}`

#### Purpose
Send entity limit increase request notification by Tenant Administrator to System administrators.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `entityType` (String) in path

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls notificationTargetService.findNotificationTargetsByTenantIdAndUsersFilterType, sysAdmins.isPresent, sysAdmins.get, systemSecurityService.getBaseUrl, EntitiesLimitIncreaseRequestNotificationInfo.builder, user.getEmail, user.getTenantId, notificationCenter.sendSystemNotification

#### Dependencies
- NotificationTargetService, NotificationCenter, SystemSecurityService

#### Usage Flow
Called by UI: `notification.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get notification request preview (getNotificationRequestPreview)

**Endpoint:** `POST /api/notification/request/preview`

#### Purpose
Returns preview for notification request.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `NotificationRequestPreview`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls request.getTemplateId, request.getTemplateId, request.getTemplate, request.setOriginatorEntityId, user.getId, request.getTargets, notificationTargetService.findNotificationTargetById, user.getTenantId, Comparator.comparing, target.getConfiguration, target.getConfiguration, notificationTargetService.findRecipientsForNotificationTargetConfig, user.getTenantId, target.getConfiguration, recipients.getTotalElements, recipients.getData, Collectors.toList, List.of, target.getConfiguration, List.of, target.getConfiguration, firstRecipient.putIfAbsent, recipientsPart.isEmpty, recipientsPart.get, recipientsPreview.size, recipient.getTitle, title.equals, recipient.getEmail, recipient.getEmail, recipientsPreview.add, recipientsCountByTarget.put, target.getName, preview.setRecipientsPreview, preview.setRecipientsCountByTarget, preview.setTotalRecipientsCount, recipientsCountByTarget.values, template.getConfiguration, entry.getValue, Collectors.toSet, NotificationProcessingContext.builder, user.getTenantId, ctx.getDeliveryMethods, Collectors.toMap, NotificationTargetType.forDeliveryMethod, ctx.getProcessedTemplate, firstRecipient.get, preview.setProcessedTemplates

#### Dependencies
- NotificationTargetService

#### Usage Flow
Called by UI: `notification.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get notification request by id (getNotificationRequestById)

**Endpoint:** `GET /api/notification/request/{id}`

#### Purpose
Fetches notification request info by request id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `id` (UUID) in path

#### Response
- **Success:** `NotificationRequestInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `notification.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get notification requests (getNotificationRequests)

**Endpoint:** `GET /api/notification/requests`

#### Purpose
Returns the page of notification requests submitted by users of this tenant or sysadmins.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<NotificationRequestInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls notificationRequestService.findNotificationRequestsInfosByTenantIdAndOriginatorType, user.getTenantId

#### Dependencies
- NotificationRequestService

#### Usage Flow
Called by UI: `notification.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete notification request (deleteNotificationRequest)

**Endpoint:** `DELETE /api/notification/request/{id}`

#### Purpose
Deletes notification request by its id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `id` (UUID) in path

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `notification.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Save notification settings (saveNotificationSettings)

**Endpoint:** `POST /api/notification/settings`

#### Purpose
Saves notification settings for this tenant or sysadmin.\n

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `NotificationSettings`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, user.isSystemAdmin, user.getTenantId, notificationSettingsService.saveNotificationSettings

#### Dependencies
- NotificationSettingsService

#### Usage Flow
Called by UI: `notification.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get notification settings (getNotificationSettings)

**Endpoint:** `GET /api/notification/settings`

#### Purpose
Retrieves notification settings for this tenant or sysadmin.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `NotificationSettings`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, user.isSystemAdmin, user.getTenantId, notificationSettingsService.findNotificationSettings

#### Dependencies
- NotificationSettingsService

#### Usage Flow
Called by UI: `notification.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get available delivery methods (getAvailableDeliveryMethods)

**Endpoint:** `GET /api/notification/deliveryMethods`

#### Purpose
Returns the list of delivery methods that are properly configured and are allowed to be used for sending notifications.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `List<NotificationDeliveryMethod>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls notificationCenter.getAvailableDeliveryMethods, user.getTenantId

#### Dependencies
- NotificationCenter

#### Usage Flow
Called by UI: `notification.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### saveUserNotificationSettings

**Endpoint:** `POST /api/notification/settings/user`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `UserNotificationSettings`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls notificationSettingsService.saveUserNotificationSettings, user.getTenantId, user.getId

#### Dependencies
- NotificationSettingsService

#### Usage Flow
Called by UI: `notification.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getUserNotificationSettings

**Endpoint:** `GET /api/notification/settings/user`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `UserNotificationSettings`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls notificationSettingsService.getUserNotificationSettings, user.getTenantId, user.getId

#### Dependencies
- NotificationSettingsService

#### Usage Flow
Called by UI: `notification.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Save notification template (saveNotificationTemplate)

**Endpoint:** `POST /api/notification/template`

#### Purpose
Creates or updates notification template.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `NotificationTemplate`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls notificationTemplate.setTenantId, notificationTemplate.getId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `notification.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get notification template by id (getNotificationTemplateById)

**Endpoint:** `GET /api/notification/template/{id}`

#### Purpose
Fetches notification template by id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `id` (UUID) in path

#### Response
- **Success:** `NotificationTemplate`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `notification.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get notification templates (getNotificationTemplates)

**Endpoint:** `GET /api/notification/templates`

#### Purpose
Returns the page of notification templates owned by sysadmin or tenant.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<NotificationTemplate>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls NotificationType.values, notificationTemplateService.findNotificationTemplatesByTenantIdAndNotificationTypes, user.getTenantId, List.of

#### Dependencies
- NotificationTemplateService

#### Usage Flow
Called by UI: `entity.service.ts, notification.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete notification template by id (deleteNotificationTemplateById

**Endpoint:** `DELETE /api/notification/template/{id}`

#### Purpose
Deletes notification template by its id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `id` (UUID) in path

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `notification.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### List Slack conversations (listSlackConversations)

**Endpoint:** `GET /api/notification/slack/conversations`

#### Purpose
List available Slack conversations by type.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `type` (SlackConversationType) in query

#### Response
- **Success:** `List<SlackConversation>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls StringUtils.isEmpty, notificationSettingsService.findNotificationSettings, user.getTenantId, settings.getDeliveryMethodsConfigs, slackConfig.getBotToken, slackService.listConversations, user.getTenantId

#### Dependencies
- NotificationSettingsService, SlackService

#### Usage Flow
Called by UI: `notification.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

## Domain: OTA / Edge / Provisioning

### Get Lwm2m Bootstrap SecurityInfo (getLwm2mBootstrapSecurityInfo)

**Endpoint:** `GET /api/lwm2m/deviceProfile/bootstrap/{isBootstrapServer}`

#### Purpose
Get the Lwm2m Bootstrap SecurityInfo object (of the current server) based on the provided isBootstrapServer parameter. If isBootstrapServer == true, get the parameters of the current Bootstrap Server. If isBootstrapServer == false, get the parameters of the current Lwm2m Server. Used for client settings when starting the client in Bootstrap mode.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `LwM2MServerSecurityConfigDefault`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls lwM2MService.getServerSecurityInfo

#### Dependencies
- LwM2MService

#### Usage Flow
Called by UI: `device-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### saveLwm2mDeviceWithCredentials

**Endpoint:** `POST /api/lwm2m/device-credentials`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `Device`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls JacksonUtil.convertValue, deviceWithDeviceCredentials.get, JacksonUtil.convertValue, deviceWithDeviceCredentials.get, deviceController.saveDeviceWithCredentials, DEFAULT.policy, DEFAULT.separator, DEFAULT.uniquifyStrategy

#### Dependencies
- DeviceController

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Is edges support enabled (isEdgesSupportEnabled)

**Endpoint:** `GET /api/edges/enabled`

#### Purpose
Returns 'true' if edges support enabled on server, 'false' - otherwise.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `boolean`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Edge (getEdgeById)

**Endpoint:** `GET /api/edge/{edgeId}`

#### Purpose
Get the Edge object based on the provided Edge Id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `Edge`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `edge.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Edge Info (getEdgeInfoById)

**Endpoint:** `GET /api/edge/info/{edgeId}`

#### Purpose
Get the Edge Info object based on the provided Edge Id.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `EdgeInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `edge.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Create Or Update Edge (saveEdge)

**Endpoint:** `POST /api/edge`

#### Purpose
Create or update the Edge. When creating edge, platform generates Edge Id as

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Body Schema:** `Edge`

#### Response
- **Success:** `Edge`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls edge.setTenantId, edge.getId, ruleChainService.getEdgeTemplateRootRuleChain, accessControlService.checkPermission, edge.getId, tbEdgeService.save

#### Dependencies
- TbEdgeService

#### Usage Flow
Called by UI: `entity.service.ts, edge.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete edge (deleteEdge)

**Endpoint:** `DELETE /api/edge/{edgeId}`

#### Purpose
Deletes the edge. Referencing non-existing edge Id will cause an error.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbEdgeService.delete

#### Dependencies
- TbEdgeService

#### Usage Flow
Called by UI: `edge.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Tenant Edges (getEdges)

**Endpoint:** `GET /api/edges`

#### Purpose
Returns a page of edges owned by tenant.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<Edge>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls edgeService.findEdgesByTenantId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, edge.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Assign edge to customer (assignEdgeToCustomer)

**Endpoint:** `POST /api/customer/{customerId}/edge/{edgeId}`

#### Purpose
Creates assignment of the edge to customer. Customer will be able to query edge afterwards.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `customerId` (String) in path

#### Response
- **Success:** `Edge`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbEdgeService.assignEdgeToCustomer

#### Dependencies
- TbEdgeService

#### Usage Flow
Called by UI: `edge.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Unassign edge from customer (unassignEdgeFromCustomer)

**Endpoint:** `DELETE /api/customer/edge/{edgeId}`

#### Purpose
Clears assignment of the edge to customer. Customer will not be able to query edge afterwards.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `Edge`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls edge.getCustomerId, edge.getCustomerId, edge.getCustomerId, tbEdgeService.unassignEdgeFromCustomer

#### Dependencies
- TbEdgeService

#### Usage Flow
Called by UI: `edge.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Make edge publicly available (assignEdgeToPublicCustomer)

**Endpoint:** `POST /api/customer/public/edge/{edgeId}`

#### Purpose
Edge will be available for non-authorized (not logged-in) users.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `Edge`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbEdgeService.assignEdgeToPublicCustomer

#### Dependencies
- TbEdgeService

#### Usage Flow
Called by UI: `edge.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Tenant Edges (getTenantEdges)

**Endpoint:** `GET /api/tenant/edges`

#### Purpose
Returns a page of edges owned by tenant.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<Edge>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls type.trim, edgeService.findEdgesByTenantIdAndType, edgeService.findEdgesByTenantId

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Tenant Edge Infos (getTenantEdgeInfos)

**Endpoint:** `GET /api/tenant/edgeInfos`

#### Purpose
Returns a page of edges info objects owned by tenant.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<EdgeInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls type.trim, edgeService.findEdgeInfosByTenantIdAndType, edgeService.findEdgeInfosByTenantId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, edge.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getTenantEdge

**Endpoint:** `GET /api/tenant/edges`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `edgeName` (String) in query

#### Response
- **Success:** `Edge`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls edgeService.findEdgeByTenantIdAndName

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, edge.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Tenant Edge by name (getTenantEdgeByName)

**Endpoint:** `GET /api/tenant/edge`

#### Purpose
Requested edge must be owned by tenant or customer that the user belongs to.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `edgeName` (String) in query

#### Response
- **Success:** `Edge`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Set root rule chain for provided edge (setEdgeRootRuleChain)

**Endpoint:** `POST /api/edge/{edgeId}/{ruleChainId}/root`

#### Purpose
Change root rule chain of the edge to the new provided rule chain. \n

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `ruleChainId` (String) in path

#### Response
- **Success:** `Edge`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, edge.getId, tbEdgeService.setEdgeRootRuleChain

#### Dependencies
- TbEdgeService

#### Usage Flow
Called by UI: `rule-chain.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Customer Edges (getCustomerEdges)

**Endpoint:** `GET /api/customer/{customerId}/edges`

#### Purpose
Returns a page of edges objects assigned to customer.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `customerId` (String) in path
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<Edge>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls user.getTenantId, type.trim, edgeService.findEdgesByTenantIdAndCustomerIdAndType, edgeService.findEdgesByTenantIdAndCustomerId

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Customer Edge Infos (getCustomerEdgeInfos)

**Endpoint:** `GET /api/customer/{customerId}/edgeInfos`

#### Purpose
Returns a page of edges info objects assigned to customer.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `customerId` (String) in path
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<EdgeInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls user.getTenantId, type.trim, edgeService.findEdgeInfosByTenantIdAndCustomerIdAndType, edgeService.findEdgeInfosByTenantIdAndCustomerId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, edge.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getEdgesByIds

**Endpoint:** `GET /api/edges`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `List<Edge>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls user.getTenantId, user.getCustomerId, edgeIds.add, customerId.isNullUid, edgeService.findEdgesByTenantIdAndIdsAsync, edgeService.findEdgesByTenantIdCustomerIdAndIdsAsync, edgesFuture.get

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `edge.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Edges By Ids (getEdgeList)

**Endpoint:** `GET /api/edges/list`

#### Purpose
Requested edges must be owned by tenant or assigned to customer which user is performing the request.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `List<Edge>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Find related edges (findEdgesByQuery)

**Endpoint:** `POST /api/edges`

#### Purpose
Returns all edges that are related to the specific entity.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Body Schema:** `EdgeSearchQuery`

#### Response
- **Success:** `List<Edge>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls query.getParameters, query.getEdgeTypes, query.getParameters, user.getTenantId, edgeService.findEdgesByQuery, edges.stream, accessControlService.checkPermission, edge.getId, Collectors.toList

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `edge.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Edge Types (getEdgeTypes)

**Endpoint:** `GET /api/edge/types`

#### Purpose
Returns a set of unique edge types based on edges that are either owned by the tenant or assigned to the customer which user is performing the request.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `List<EntitySubtype>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls user.getTenantId, edgeService.findEdgeTypesByTenantId, edgeTypes.get

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, edge.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Sync edge (syncEdge)

**Endpoint:** `POST /api/edge/sync/{edgeId}`

#### Purpose
Starts synchronization process between edge and cloud. \n

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `edgeId` (String) in path

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls edgeRpcServiceOpt.isPresent, user.getTenantId, edgeRpcServiceOpt.get, fromEdgeSyncResponse.isSuccess, response.setResult, response.setErrorResult, fromEdgeSyncResponse.getError

#### Dependencies
- Optional<EdgeRpcService>

#### Usage Flow
Called by UI: `edge.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Find missing rule chains (findMissingToRelatedRuleChains)

**Endpoint:** `GET /api/edge/missingToRelatedRuleChains/{edgeId}`

#### Purpose
Returns list of rule chains ids that are not assigned to particular edge, but these rule chains are present in the already assigned rule chains to edge.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `edgeId` (String) in path

#### Response
- **Success:** `String`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls user.getTenantId, edgeService.findMissingToRelatedRuleChains, class.getName

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `edge.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Import the bulk of edges (processEdgesBulkImport)

**Endpoint:** `POST /api/edge/bulk_import`

#### Purpose
There's an ability to import the bulk of edges using the only .csv file.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request
- **Body Schema:** `BulkImportRequest`

#### Response
- **Success:** `BulkImportResult<Edge>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls ruleChainService.getEdgeTemplateRootRuleChain, user.getTenantId, edgeBulkImportService.processBulkImport

#### Dependencies
- EdgeBulkImportService

#### Usage Flow
Called by UI: `edge.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Edge Install Instructions (getEdgeInstallInstructions)

**Endpoint:** `GET /api/edge/instructions/install/{edgeId}/{method}`

#### Purpose
Get an install instructions for provided edge id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `edgeId` (String) in path
  - `method` (String) in path

#### Response
- **Success:** `EdgeInstructions`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls edgeInstallServiceOpt.isPresent, edgeInstallServiceOpt.get

#### Dependencies
- Optional<EdgeInstallInstructionsService>

#### Usage Flow
Called by UI: `edge.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Edge Upgrade Instructions (getEdgeUpgradeInstructions)

**Endpoint:** `GET /api/edge/instructions/upgrade/{edgeVersion}/{method}`

#### Purpose
Get an upgrade instructions for provided edge version.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `edgeVersion` (String) in path
  - `method` (String) in path

#### Response
- **Success:** `EdgeInstructions`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls edgeUpgradeServiceOpt.isPresent, edgeUpgradeServiceOpt.get

#### Dependencies
- Optional<EdgeUpgradeInstructionsService>

#### Usage Flow
Called by UI: `edge.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Is edge upgrade enabled (isEdgeUpgradeAvailable)

**Endpoint:** `GET /api/edge/{edgeId}/upgrade/available`

#### Purpose
Returns 'true' if upgrade available for connected edge, 'false' - otherwise.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `edgeId` (String) in path

#### Response
- **Success:** `boolean`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls edgeUpgradeServiceOpt.isPresent, edgeUpgradeServiceOpt.get, edge.getTenantId, edge.getId

#### Dependencies
- Optional<EdgeUpgradeInstructionsService>

#### Usage Flow
Called by UI: `edge.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Edge Events (getEdgeEvents)

**Endpoint:** `GET /api/edge/{edgeId}/events`

#### Purpose
Returns a page of edge events for the requested edge.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<EdgeEvent>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls edgeEventService.findEdgeEvents

#### Dependencies
- EdgeEventService

#### Usage Flow
Called by UI: `edge.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Download OTA Package (downloadOtaPackage)

**Endpoint:** `GET /api/otaPackage/{otaPackageId}/download`

#### Purpose
Download OTA Package based on the provided OTA Package Id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `ResponseEntity<org.springframework.core.io.Resource>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls otaPackage.hasUrl, ResponseEntity.badRequest, otaPackage.getData, ResponseEntity.ok, otaPackage.getFileName, otaPackage.getFileName, resource.contentLength, otaPackage.getContentType

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `ota-package.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get OTA Package Info (getOtaPackageInfoById)

**Endpoint:** `GET /api/otaPackage/info/{otaPackageId}`

#### Purpose
Fetch the OTA Package Info object based on the provided OTA Package Id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `OtaPackageInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls otaPackageService.findOtaPackageInfoById

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `ota-package.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get OTA Package (getOtaPackageById)

**Endpoint:** `GET /api/otaPackage/{otaPackageId}`

#### Purpose
Fetch the OTA Package object based on the provided OTA Package Id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `OtaPackage`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `ota-package.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Create Or Update OTA Package Info (saveOtaPackageInfo)

**Endpoint:** `POST /api/otaPackage`

#### Purpose
Create or update the OTA Package Info. When creating OTA Package Info, platform generates OTA Package id as

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request
- **Body Schema:** `SaveOtaPackageInfoRequest`

#### Response
- **Success:** `OtaPackageInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls otaPackageInfo.setTenantId, otaPackageInfo.getId, tbOtaPackageService.save, parameters.RequestBody

#### Dependencies
- TbOtaPackageService

#### Usage Flow
Called by UI: `ota-package.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Save OTA Package data (saveOtaPackageData)

**Endpoint:** `POST /api/otaPackage/{otaPackageId}`

#### Purpose
Update the OTA Package. Adds the date to the existing OTA Package Info

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `OtaPackageInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls ChecksumAlgorithm.valueOf, checksumAlgorithmStr.toUpperCase, file.getBytes, tbOtaPackageService.saveOtaPackageData, file.getOriginalFilename, file.getContentType

#### Dependencies
- TbOtaPackageService

#### Usage Flow
Called by UI: `ota-package.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get OTA Package Infos (getOtaPackages)

**Endpoint:** `GET /api/otaPackages`

#### Purpose
Returns a page of OTA Package Info objects owned by tenant.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<OtaPackageInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls otaPackageService.findTenantOtaPackagesByTenantId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, ota-package.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get OTA Package Infos by device profile and type (getOtaPackagesByDeviceProfileAndType)

**Endpoint:** `GET /api/otaPackages/{deviceProfileId}/{type}`

#### Purpose
Returns a page of OTA Package Info objects owned by tenant.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `deviceProfileId` (String) in path
  - `type` (String) in path
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<OtaPackageInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls otaPackageService.findTenantOtaPackagesByTenantIdAndDeviceProfileIdAndTypeAndHasData, OtaPackageType.valueOf

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `ota-package.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete OTA Package (deleteOtaPackage)

**Endpoint:** `DELETE /api/otaPackage/{otaPackageId}`

#### Purpose
Deletes the OTA Package. Referencing non-existing OTA Package Id will cause an error.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `otaPackageId` (String) in path

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbOtaPackageService.delete

#### Dependencies
- TbOtaPackageService

#### Usage Flow
Called by UI: `ota-package.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getDeviceAttributes

**Endpoint:** `GET /api/v1/{deviceToken}/attributes`

#### Purpose
No description provided in source.

#### Authentication
Required: No
Expression: `None`

#### Request
- **Parameters:**
  - `deviceToken` (String) in path

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls transportContext.getTransportService, ValidateDeviceTokenRequestMsg.newBuilder, GetAttributeRequestMsg.newBuilder, StringUtils.isEmpty, Arrays.asList, clientKeys.split, StringUtils.isEmpty, Arrays.asList, sharedKeys.split, request.addAllClientAttributeNames, request.addAllSharedAttributeNames, transportContext.getTransportService, transportService.registerSyncSession, transportContext.getTransportService, transportContext.getDefaultTimeout, transportService.process, request.build

#### Dependencies
- HttpTransportContext, TransportContext, TransportContext, TransportService, TransportService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### postDeviceAttributes

**Endpoint:** `POST /api/v1/{deviceToken}/attributes`

#### Purpose
No description provided in source.

#### Authentication
Required: No
Expression: `None`

#### Request
- **Parameters:**
  - `deviceToken` (String) in path
- **Body Schema:** `String`

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls parameters.RequestBody, transportContext.getTransportService, ValidateDeviceTokenRequestMsg.newBuilder, transportContext.getTransportService, transportService.process, JsonConverter.convertToAttributesProto, JsonParser.parseString

#### Dependencies
- HttpTransportContext, TransportContext, TransportContext, TransportService, TransportService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### postTelemetry

**Endpoint:** `POST /api/v1/{deviceToken}/telemetry`

#### Purpose
No description provided in source.

#### Authentication
Required: No
Expression: `None`

#### Request
- **Parameters:**
  - `deviceToken` (String) in path
- **Body Schema:** `String`

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls transportContext.getTransportService, ValidateDeviceTokenRequestMsg.newBuilder, transportContext.getTransportService, transportService.process, JsonConverter.convertToTelemetryProto, JsonParser.parseString

#### Dependencies
- HttpTransportContext, TransportContext, TransportContext, TransportService, TransportService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### saveClaimingInfo

**Endpoint:** `POST /api/v1/{deviceToken}/claim`

#### Purpose
No description provided in source.

#### Authentication
Required: No
Expression: `None`

#### Request
- **Parameters:**
  - `deviceToken` (String) in path
- **Body Schema:** `String`

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls transportContext.getTransportService, ValidateDeviceTokenRequestMsg.newBuilder, transportContext.getTransportService, sessionInfo.getDeviceIdMSB, sessionInfo.getDeviceIdLSB, transportService.process, JsonConverter.convertToClaimDeviceProto

#### Dependencies
- HttpTransportContext, TransportContext, TransportContext, TransportService, SessionInfoProto, TransportService, SessionInfoProto

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### subscribeToCommands

**Endpoint:** `GET /api/v1/{deviceToken}/rpc`

#### Purpose
No description provided in source.

#### Authentication
Required: No
Expression: `None`

#### Request
- **Parameters:**
  - `deviceToken` (String) in path

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls transportContext.getTransportService, ValidateDeviceTokenRequestMsg.newBuilder, transportContext.getTransportService, transportService.registerSyncSession, transportContext.getTransportService, transportContext.getDefaultTimeout, transportService.process, SubscribeToRPCMsg.getDefaultInstance

#### Dependencies
- HttpTransportContext, TransportContext, TransportContext, TransportService, TransportService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### replyToCommand

**Endpoint:** `POST /api/v1/{deviceToken}/rpc/{requestId}`

#### Purpose
No description provided in source.

#### Authentication
Required: No
Expression: `None`

#### Request
- **Parameters:**
  - `deviceToken` (String) in path
  - `requestId` (Integer) in path
- **Body Schema:** `String`

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls parameters.RequestBody, transportContext.getTransportService, ValidateDeviceTokenRequestMsg.newBuilder, transportContext.getTransportService, transportService.process, ToDeviceRpcResponseMsg.newBuilder

#### Dependencies
- HttpTransportContext, TransportContext, TransportContext, TransportService, TransportService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### postRpcRequest

**Endpoint:** `POST /api/v1/{deviceToken}/rpc`

#### Purpose
No description provided in source.

#### Authentication
Required: No
Expression: `None`

#### Request
- **Parameters:**
  - `deviceToken` (String) in path
- **Body Schema:** `String`

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls parameters.RequestBody, transportContext.getTransportService, ValidateDeviceTokenRequestMsg.newBuilder, JsonParser.parseString, transportContext.getTransportService, transportService.registerSyncSession, transportContext.getTransportService, transportContext.getDefaultTimeout, transportService.process, ToServerRpcRequestMsg.newBuilder, request.get, request.get

#### Dependencies
- HttpTransportContext, TransportContext, TransportContext, TransportService, TransportService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### subscribeToAttributes

**Endpoint:** `GET /api/v1/{deviceToken}/attributes/updates`

#### Purpose
No description provided in source.

#### Authentication
Required: No
Expression: `None`

#### Request
- **Parameters:**
  - `deviceToken` (String) in path

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls transportContext.getTransportService, ValidateDeviceTokenRequestMsg.newBuilder, transportContext.getTransportService, transportService.registerSyncSession, transportContext.getTransportService, transportContext.getDefaultTimeout, transportService.process, SubscribeToAttributeUpdatesMsg.getDefaultInstance

#### Dependencies
- HttpTransportContext, TransportContext, TransportContext, TransportService, TransportService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getFirmware

**Endpoint:** `GET /api/v1/{deviceToken}/firmware`

#### Purpose
No description provided in source.

#### Authentication
Required: No
Expression: `None`

#### Request
- **Parameters:**
  - `deviceToken` (String) in path
  - `title` (String) in query
  - `version` (String) in query

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getSoftware

**Endpoint:** `GET /api/v1/{deviceToken}/software`

#### Purpose
No description provided in source.

#### Authentication
Required: No
Expression: `None`

#### Request
- **Parameters:**
  - `deviceToken` (String) in path
  - `title` (String) in query
  - `version` (String) in query

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### provisionDevice

**Endpoint:** `POST /api/v1/provision`

#### Purpose
No description provided in source.

#### Authentication
Required: No
Expression: `None`

#### Request
- **Body Schema:** `String`

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls parameters.RequestBody, transportContext.getTransportService, JsonConverter.convertToProvisionRequestMsg, transportContext.getTransportService, ValidateDeviceTokenRequestMsg.newBuilder, GetOtaPackageRequestMsg.newBuilder, sessionInfo.getTenantIdMSB, sessionInfo.getTenantIdLSB, sessionInfo.getDeviceIdMSB, sessionInfo.getDeviceIdLSB, firmwareType.name, transportContext.getTransportService, msg.hasDeviceInfo, onSuccess.accept, SessionInfoCreator.create, UUID.randomUUID, responseWriter.setResult, e.getMessage, responseWriter.setResult, responseWriter.setResult, JsonConverter.toJson, e.getMessage, responseWriter.setResult, SUCCESS.equals, otaPackageResponseMsg.getResponseStatus, responseWriter.setResult, title.equals, otaPackageResponseMsg.getTitle, version.equals, otaPackageResponseMsg.getVersion, otaPackageResponseMsg.getOtaPackageIdMSB, otaPackageResponseMsg.getOtaPackageIdLSB, transportContext.getOtaPackageDataCache, ResponseEntity.ok, otaPackageResponseMsg.getFileName, otaPackageResponseMsg.getFileName, resource.contentLength, otaPackageResponseMsg.getContentType, responseWriter.setResult, responseWriter.setResult, e.getMessage, responseWriter.setResult, transportService.deregisterSession, responseWriter.setResult, responseWriter.setResult, responseWriter.setResult, JsonConverter.toJson, responseWriter.setResult, JsonConverter.toJson, sessionCloseNotification.getMessage, responseWriter.setResult, responseWriter.setResult, JsonConverter.toJson, transportService.process, responseWriter.setResult, JsonConverter.toJson, sessionInfo.getSessionIdMSB, sessionInfo.getSessionIdLSB, responseWriter.setResult, MediaType.parseMediaType

#### Dependencies
- HttpTransportContext, TransportContext, DeferredResult<ResponseEntity>, Consumer<SessionInfoProto>, DeferredResult<ResponseEntity>, TransportContext, DeferredResult<ResponseEntity>, TransportService, SessionInfoProto, DeferredResult<ResponseEntity>, DeferredResult<ResponseEntity>, TransportService, SessionInfoProto

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

## Domain: Reports

### Save Trendz settings (saveTrendzSettings)

**Endpoint:** `POST /api/trendz/settings`

#### Purpose
Saves Trendz settings for this tenant.\n

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request
- **Body Schema:** `TrendzSettings`

#### Response
- **Success:** `TrendzSettings`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessControlService.checkPermission, user.getTenantId, trendzSettingsService.saveTrendzSettings

#### Dependencies
- TrendzSettingsService

#### Usage Flow
Called by UI: `trendz-settings.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Trendz Settings (getTrendzSettings)

**Endpoint:** `GET /api/trendz/settings`

#### Purpose
Retrieves Trendz settings for this tenant.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `TrendzSettings`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls user.getTenantId, trendzSettingsService.findTrendzSettings

#### Dependencies
- TrendzSettingsService

#### Usage Flow
Called by UI: `trendz-settings.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

## Domain: Rule Engine

### Get Rule Chain (getRuleChainById)

**Endpoint:** `GET /api/ruleChain/{ruleChainId}`

#### Purpose
Fetch the Rule Chain object based on the provided Rule Chain Id.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `RuleChain`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `rule-chain.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Rule Chain output labels (getRuleChainOutputLabels)

**Endpoint:** `GET /api/ruleChain/{ruleChainId}/output/labels`

#### Purpose
Fetch the unique labels for the \

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `Set<String>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbRuleChainService.getRuleChainOutputLabels

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `rule-chain.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get output labels usage (getRuleChainOutputLabelsUsage)

**Endpoint:** `GET /api/ruleChain/{ruleChainId}/output/labels/usage`

#### Purpose
Fetch the list of rule chains and the relation types (labels) they use to process output of the current rule chain based on the provided Rule Chain Id.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `List<RuleChainOutputLabelsUsage>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbRuleChainService.getOutputLabelUsage

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Rule Chain (getRuleChainById)

**Endpoint:** `GET /api/ruleChain/{ruleChainId}/metadata`

#### Purpose
Fetch the Rule Chain Metadata object based on the provided Rule Chain Id.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `RuleChainMetaData`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls ruleChainService.loadRuleChainMetaData

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `rule-chain.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Create Or Update Rule Chain (saveRuleChain)

**Endpoint:** `POST /api/ruleChain`

#### Purpose
Create or update the Rule Chain. When creating Rule Chain, platform generates Rule Chain Id as

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Body Schema:** `RuleChain`

#### Response
- **Success:** `RuleChain`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls ruleChain.setTenantId, ruleChain.getId, tbRuleChainService.save

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `rule-chain.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Create Default Rule Chain (setDeviceDefaultRuleChain)

**Endpoint:** `POST /api/ruleChain/device/default`

#### Purpose
Create rule chain from template, based on the specified name in the request.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Body Schema:** `DefaultRuleChainCreateRequest`

#### Response
- **Success:** `RuleChain`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls request.getName, tbRuleChainService.saveDefaultByName

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `rule-chain.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Set Root Rule Chain (setRootRuleChain)

**Endpoint:** `POST /api/ruleChain/{ruleChainId}/root`

#### Purpose
Makes the rule chain to be root rule chain. Updates previous root rule chain as well.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `RuleChain`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbRuleChainService.setRootRuleChain

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `rule-chain.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Update Rule Chain Metadata

**Endpoint:** `POST /api/ruleChain/metadata`

#### Purpose
Updates the rule chain metadata.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Body Schema:** `RuleChainMetaData`

#### Response
- **Success:** `RuleChainMetaData`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls actorContext.getDebugPerTenantLimits, debugPerTenantLimits.getOrDefault, debugPerTenantLimits.remove, ruleChainMetaData.getRuleChainId, tbRuleChainService.saveRuleChainMetaData

#### Dependencies
- ActorSystemContext

#### Usage Flow
Called by UI: `rule-chain.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Rule Chains (getRuleChains)

**Endpoint:** `GET /api/ruleChains`

#### Purpose
Returns a page of Rule Chains owned by tenant.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<RuleChain>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls StringUtils.isNotBlank, RuleChainType.valueOf, ruleChainService.findTenantRuleChainsByType

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, rule-chain.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete rule chain (deleteRuleChain)

**Endpoint:** `DELETE /api/ruleChain/{ruleChainId}`

#### Purpose
Deletes the rule chain. Referencing non-existing rule chain Id will cause an error.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbRuleChainService.delete

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `rule-chain.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get latest input message (getLatestRuleNodeDebugInput)

**Endpoint:** `GET /api/ruleNode/{ruleNodeId}/debugIn`

#### Purpose
Gets the input message from the debug events for specified Rule Chain Id.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `JsonNode`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls Optional.ofNullable, eventService.findLatestDebugRuleNodeInEvent

#### Dependencies
- EventService

#### Usage Flow
Called by UI: `rule-chain.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Is TBEL script executor enabled

**Endpoint:** `GET /api/ruleChain/tbelEnabled`

#### Purpose
Returns 'True' if the TBEL script execution is enabled

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `Boolean`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Test Script function

**Endpoint:** `POST /api/ruleChain/testScript`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Body Schema:** `JsonNode`

#### Response
- **Success:** `JsonNode`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls parameters.RequestBody, inputParams.get, inputParams.get, inputParams.get, JacksonUtil.treeToValue, inputParams.get, inputParams.get, JacksonUtil.convertValue, inputParams.get, JS.equals, TbMsg.newMsg, engine.executeUpdateAsync, engine.executeGenerateAsync, Boolean.toString, engine.executeFilterAsync, JacksonUtil.toString, engine.executeSwitchAsync, JacksonUtil.toString, engine.executeJsonAsync, engine.executeToStringAsync, ExceptionUtils.getRootCause, ObjectUtils.firstNonNull, rootCause.getMessage, e.getMessage, e.getClass, engine.destroy, JacksonUtil.newObjectNode

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `rule-chain.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Export Rule Chains

**Endpoint:** `GET /api/ruleChains/export`

#### Purpose
Exports all tenant rule chains as one JSON.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `limit` (int) in query

#### Response
- **Success:** `RuleChainData`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls ruleChainService.exportTenantRuleChains

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Import Rule Chains

**Endpoint:** `POST /api/ruleChains/import`

#### Purpose
Imports all tenant rule chains as one JSON.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Body Schema:** `RuleChainData`

#### Response
- **Success:** `List<RuleChainImportResult>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls ruleChainService.importTenantRuleChains, JacksonUtil.toString, msgs.size, JacksonUtil.newArrayNode, msgs.get, JacksonUtil.toString, JacksonUtil.newObjectNode, StringUtils.isEmpty, msg.getData, msgData.set, JacksonUtil.toJsonNode, msg.getData, msg.getMetaData, msgData.set, JacksonUtil.valueToTree, msgData.put, msg.getType

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Assign rule chain to edge (assignRuleChainToEdge)

**Endpoint:** `POST /api/edge/{edgeId}/ruleChain/{ruleChainId}`

#### Purpose
Creates assignment of an existing rule chain to an instance of The Edge.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `edgeId` (String) in path

#### Response
- **Success:** `RuleChain`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbRuleChainService.assignRuleChainToEdge

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `rule-chain.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Unassign rule chain from edge (unassignRuleChainFromEdge)

**Endpoint:** `DELETE /api/edge/{edgeId}/ruleChain/{ruleChainId}`

#### Purpose
Clears assignment of the rule chain to the edge.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `edgeId` (String) in path

#### Response
- **Success:** `RuleChain`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbRuleChainService.unassignRuleChainFromEdge

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `rule-chain.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Edge Rule Chains (getEdgeRuleChains)

**Endpoint:** `GET /api/edge/{edgeId}/ruleChains`

#### Purpose
Returns a page of Rule Chains assigned to the specified edge.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<RuleChain>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls ruleChainService.findRuleChainsByTenantIdAndEdgeId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, rule-chain.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Set Edge Template Root Rule Chain (setEdgeTemplateRootRuleChain)

**Endpoint:** `POST /api/ruleChain/{ruleChainId}/edgeTemplateRoot`

#### Purpose
Makes the rule chain to be root rule chain for any new edge that will be created.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `RuleChain`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbRuleChainService.setEdgeTemplateRootRuleChain

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `rule-chain.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Set Auto Assign To Edge Rule Chain (setAutoAssignToEdgeRuleChain)

**Endpoint:** `POST /api/ruleChain/{ruleChainId}/autoAssignToEdge`

#### Purpose
Makes the rule chain to be automatically assigned for any new edge that will be created.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `RuleChain`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbRuleChainService.setAutoAssignToEdgeRuleChain

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `rule-chain.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Unset Auto Assign To Edge Rule Chain (unsetAutoAssignToEdgeRuleChain)

**Endpoint:** `DELETE /api/ruleChain/{ruleChainId}/autoAssignToEdge`

#### Purpose
Removes the rule chain from the list of rule chains that are going to be automatically assigned for any new edge that will be created.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `RuleChain`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbRuleChainService.unsetAutoAssignToEdgeRuleChain

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `rule-chain.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Auto Assign To Edge Rule Chains (getAutoAssignToEdgeRuleChains)

**Endpoint:** `GET /api/ruleChain/autoAssignToEdgeRuleChains`

#### Purpose
Returns a list of Rule Chains that will be assigned to a newly created edge.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `List<RuleChain>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls result.add

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `rule-chain.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getRuleChainsByIdsV1

**Endpoint:** `GET /api/ruleChains`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `ruleChainIds` (Set<UUID>) in query

#### Response
- **Success:** `List<RuleChain>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls ruleChainIds.add, ruleChainService.findRuleChainsByIds

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Rule Chains By Ids (getRuleChainsByIds)

**Endpoint:** `GET /api/ruleChains/list`

#### Purpose
Requested rule chains must be owned by tenant which is performing the request.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `ruleChainIds` (Set<UUID>) in query

#### Response
- **Success:** `List<RuleChain>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, rule-chain.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Push user message to the rule engine (handleRuleEngineRequestForUser)

**Endpoint:** `POST /`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Body Schema:** `String`

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls parameters.RequestBody

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `device.service.ts, event.service.ts, entity-view.service.ts, asset.service.ts, device-profile.service.ts, entity.service.ts, dashboard.service.ts, edge.service.ts, auth.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Push entity message to the rule engine (handleRuleEngineRequestForEntity)

**Endpoint:** `POST /{entityType}/{entityId}`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `entityType` (String) in path
  - `entityId` (String) in path
- **Body Schema:** `String`

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls parameters.RequestBody

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `calculated-fields.service.ts, api-key.service.ts, resource.service.ts, queue.service.ts, notification.service.ts, component-descriptor.service.ts, edge.service.ts, widget.service.ts, rule-chain.service.ts, customer.service.ts, asset.service.ts, alarm.service.ts, usage-info.service.ts, dashboard.service.ts, domain.service.ts, user.service.ts, device.service.ts, tenant.service.ts, entity-view.service.ts, entity-relation.service.ts, asset-profile.service.ts, image.service.ts, ota-package.service.ts, device-profile.service.ts, tenant-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Push entity message with timeout to the rule engine (handleRuleEngineRequestForEntityWithTimeout)

**Endpoint:** `POST /{entityType}/{entityId}/{timeout}`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `entityType` (String) in path
  - `entityId` (String) in path
  - `timeout` (int) in path
- **Body Schema:** `String`

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls parameters.RequestBody

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `trendz-settings.service.ts, audit-log.service.ts, user-settings.service.ts, calculated-fields.service.ts, entity.service.ts, api-key.service.ts, resource.service.ts, ai-model.service.ts, queue.service.ts, notification.service.ts, component-descriptor.service.ts, edge.service.ts, widget.service.ts, rule-chain.service.ts, customer.service.ts, asset.service.ts, alarm-rules.service.ts, alarm.service.ts, dashboard.service.ts, domain.service.ts, user.service.ts, device.service.ts, tenant.service.ts, entity-view.service.ts, mobile-app.service.ts, oauth2.service.ts, admin.service.ts, entity-relation.service.ts, asset-profile.service.ts, ui-settings.service.ts, auth.service.ts, image.service.ts, ota-package.service.ts, two-factor-authentication.service.ts, device-profile.service.ts, tenant-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Push entity message with timeout and specified queue to the rule engine (handleRuleEngineRequestForEntityWithQueueAndTimeout)

**Endpoint:** `POST /{entityType}/{entityId}/{queueName}/{timeout}`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `entityType` (String) in path
  - `entityId` (String) in path
  - `queueName` (String) in path
  - `timeout` (int) in path
- **Body Schema:** `String`

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls parameters.RequestBody, StringUtils.isEmpty, StringUtils.isEmpty, currentUser.getId, EntityIdFactory.getByTypeAndId, JacksonUtil.toJsonNode, accessValidator.validate, System.currentTimeMillis, UUID.randomUUID, metaData.put, serviceInfoProvider.getServiceId, metaData.put, requestId.toString, metaData.put, Long.toString, TbMsg.newMsg, currentUser.getCustomerId, ruleEngineCallService.processRestApiCallToRuleEngine, currentUser.getTenantId, response.setResult, rpcRequest.responseWriter, responseWriter.setResult, response.getData, StringUtils.isEmpty, responseWriter.setResult, JacksonUtil.toJsonNode, responseWriter.setResult, responseWriter.setResult, rpcRequest.user, rpcRequest.request, rpcRequest.request, auditLogService.logEntityAction, user.getTenantId, user.getCustomerId, user.getId, user.getName, BaseController.toException, response.getData

#### Dependencies
- RuleEngineCallService, AccessValidator

#### Usage Flow
Called by UI: `user-settings.service.ts, calculated-fields.service.ts, entity.service.ts, api-key.service.ts, resource.service.ts, ai-model.service.ts, mobile-application.service.ts, queue.service.ts, notification.service.ts, edge.service.ts, widget.service.ts, event.service.ts, rule-chain.service.ts, customer.service.ts, asset.service.ts, alarm-rules.service.ts, alarm.service.ts, dashboard.service.ts, domain.service.ts, user.service.ts, device.service.ts, tenant.service.ts, entity-view.service.ts, mobile-app.service.ts, oauth2.service.ts, admin.service.ts, entity-relation.service.ts, asset-profile.service.ts, auth.service.ts, alarm-comment.service.ts, image.service.ts, ota-package.service.ts, two-factor-authentication.service.ts, device-profile.service.ts, entities-version-control.service.ts, tenant-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

## Domain: Telemetry & Timeseries

### Get all attribute keys (getAttributeKeys)

**Endpoint:** `GET /{entityType}/{entityId}/keys/attributes`

#### Purpose
Returns a set of unique attribute key names for the selected entity.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `entityType` (String) in path
  - `entityId` (String) in path

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessValidator.validateEntityAndCallback

#### Dependencies
- AccessValidator

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get all attribute keys by scope (getAttributeKeysByScope)

**Endpoint:** `GET /{entityType}/{entityId}/keys/attributes/{scope}`

#### Purpose
Returns a set of unique attribute key names for the selected entity and attributes scope:

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `entityType` (String) in path
  - `entityId` (String) in path
  - `scope` (AttributeScope) in path

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessValidator.validateEntityAndCallback

#### Dependencies
- AccessValidator

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get attributes (getAttributes)

**Endpoint:** `GET /{entityType}/{entityId}/values/attributes`

#### Purpose
Returns all attributes that belong to specified entity. Use optional 'keys' parameter to return specific attributes.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `entityType` (String) in path
  - `entityId` (String) in path

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessValidator.validateEntityAndCallback

#### Dependencies
- AccessValidator

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get attributes by scope (getAttributesByScope)

**Endpoint:** `GET /{entityType}/{entityId}/values/attributes/{scope}`

#### Purpose
Returns all attributes of a specified scope that belong to specified entity.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `entityType` (String) in path
  - `entityId` (String) in path
  - `scope` (AttributeScope) in path

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessValidator.validateEntityAndCallback

#### Dependencies
- AccessValidator

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get time series keys (getTimeseriesKeys)

**Endpoint:** `GET /{entityType}/{entityId}/keys/timeseries`

#### Purpose
Returns a set of unique time series key names for the selected entity.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `entityType` (String) in path
  - `entityId` (String) in path

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessValidator.validateEntityAndCallback, Futures.addCallback, tsService.findAllLatest, MoreExecutors.directExecutor

#### Dependencies
- TimeseriesService, AccessValidator

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get latest time series value (getLatestTimeseries)

**Endpoint:** `GET /{entityType}/{entityId}/values/timeseries`

#### Purpose
Returns all time series that belong to specified entity. Use optional 'keys' parameter to return specific time series.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `entityType` (String) in path
  - `entityId` (String) in path

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls accessValidator.validateEntityAndCallback

#### Dependencies
- AccessValidator

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getTimeseries

**Endpoint:** `GET /{entityType}/{entityId}/values/timeseries`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `entityType` (String) in path
  - `entityId` (String) in path
  - `startTs` (Long) in query
  - `endTs` (Long) in query

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls Futures.addCallback, tbTelemetryService.getTimeseries, EntityIdFactory.getByTypeAndId, Aggregation.valueOf, MoreExecutors.directExecutor

#### Dependencies
- TbTelemetryService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get time series data (getTimeseriesHistory)

**Endpoint:** `GET /{entityType}/{entityId}/values/timeseries/history`

#### Purpose
Returns a range of time series values for specified entity.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `entityType` (String) in path
  - `entityId` (String) in path
  - `startTs` (Long) in query
  - `endTs` (Long) in query

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Save device attributes (saveDeviceAttributes)

**Endpoint:** `POST /{deviceId}/{scope}`

#### Purpose
Creates or updates the device attributes based on device id and specified attribute scope.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `deviceId` (String) in path
  - `scope` (AttributeScope) in path
- **Body Schema:** `String`

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls parameters.RequestBody, EntityIdFactory.getByTypeAndUuid

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `calculated-fields.service.ts, api-key.service.ts, resource.service.ts, queue.service.ts, notification.service.ts, component-descriptor.service.ts, edge.service.ts, widget.service.ts, rule-chain.service.ts, customer.service.ts, asset.service.ts, alarm.service.ts, usage-info.service.ts, dashboard.service.ts, domain.service.ts, user.service.ts, device.service.ts, tenant.service.ts, entity-view.service.ts, entity-relation.service.ts, asset-profile.service.ts, image.service.ts, ota-package.service.ts, device-profile.service.ts, tenant-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Save entity attributes (saveEntityAttributesV1)

**Endpoint:** `POST /{entityType}/{entityId}/{scope}`

#### Purpose
Creates or updates the entity attributes based on Entity Id and the specified attribute scope.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `entityType` (String) in path
  - `entityId` (String) in path
  - `scope` (AttributeScope) in path
- **Body Schema:** `String`

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls parameters.RequestBody, EntityIdFactory.getByTypeAndId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `trendz-settings.service.ts, audit-log.service.ts, user-settings.service.ts, calculated-fields.service.ts, entity.service.ts, api-key.service.ts, resource.service.ts, ai-model.service.ts, queue.service.ts, notification.service.ts, component-descriptor.service.ts, edge.service.ts, widget.service.ts, rule-chain.service.ts, customer.service.ts, asset.service.ts, alarm-rules.service.ts, alarm.service.ts, dashboard.service.ts, domain.service.ts, user.service.ts, device.service.ts, tenant.service.ts, entity-view.service.ts, mobile-app.service.ts, oauth2.service.ts, admin.service.ts, entity-relation.service.ts, asset-profile.service.ts, ui-settings.service.ts, auth.service.ts, image.service.ts, ota-package.service.ts, two-factor-authentication.service.ts, device-profile.service.ts, tenant-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Save entity attributes (saveEntityAttributesV2)

**Endpoint:** `POST /{entityType}/{entityId}/attributes/{scope}`

#### Purpose
Creates or updates the entity attributes based on Entity Id and the specified attribute scope.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `entityType` (String) in path
  - `entityId` (String) in path
  - `scope` (AttributeScope) in path
- **Body Schema:** `String`

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls parameters.RequestBody, EntityIdFactory.getByTypeAndId

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Save or update time series data (saveEntityTelemetry)

**Endpoint:** `POST /{entityType}/{entityId}/timeseries/{scope}`

#### Purpose
Creates or updates the entity time series data based on the Entity Id and request payload.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `entityType` (String) in path
  - `entityId` (String) in path
  - `scope` (String) in path
- **Body Schema:** `String`

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls parameters.RequestBody, EntityIdFactory.getByTypeAndId

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Save or update time series data with TTL (saveEntityTelemetryWithTTL)

**Endpoint:** `POST /{entityType}/{entityId}/timeseries/{scope}/{ttl}`

#### Purpose
Creates or updates the entity time series data based on the Entity Id and request payload.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `entityType` (String) in path
  - `entityId` (String) in path
  - `scope` (String) in path
  - `ttl` (Long) in path
- **Body Schema:** `String`

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls parameters.RequestBody, EntityIdFactory.getByTypeAndId

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete entity time series data (deleteEntityTimeseries)

**Endpoint:** `DELETE /{entityType}/{entityId}/timeseries/delete`

#### Purpose
Delete time series for selected entity based on entity id, entity type and keys.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `entityType` (String) in path
  - `entityId` (String) in path

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls EntityIdFactory.getByTypeAndId, keys.isEmpty, System.currentTimeMillis, accessValidator.validateEntityAndCallback, deleteTsKvQueries.add, tsSubService.deleteTimeseries, TimeseriesDeleteRequest.builder, result.setResult, result.setResult

#### Dependencies
- AccessValidator

#### Usage Flow
Called by UI: `attribute.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete device attributes (deleteDeviceAttributes)

**Endpoint:** `DELETE /{deviceId}/{scope}`

#### Purpose
Delete device attributes using provided Device Id, scope and a list of keys.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `scope` (AttributeScope) in path

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls EntityIdFactory.getByTypeAndUuid

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `calculated-fields.service.ts, api-key.service.ts, resource.service.ts, queue.service.ts, notification.service.ts, component-descriptor.service.ts, edge.service.ts, widget.service.ts, rule-chain.service.ts, customer.service.ts, asset.service.ts, alarm.service.ts, usage-info.service.ts, dashboard.service.ts, domain.service.ts, user.service.ts, device.service.ts, tenant.service.ts, entity-view.service.ts, entity-relation.service.ts, asset-profile.service.ts, image.service.ts, ota-package.service.ts, device-profile.service.ts, tenant-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete entity attributes (deleteEntityAttributes)

**Endpoint:** `DELETE /{entityType}/{entityId}/{scope}`

#### Purpose
Delete entity attributes using provided Entity Id, scope and a list of keys.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `entityType` (String) in path
  - `entityId` (String) in path
  - `scope` (AttributeScope) in path

#### Response
- **Success:** `DeferredResult<ResponseEntity>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls EntityIdFactory.getByTypeAndId, params.get, params.get, keys.isEmpty, accessValidator.validateEntityAndCallback, tsSubService.deleteAttributes, AttributesDeleteRequest.builder, entityIdSrc.getEntityType, entityId.getId, tbClusterService.pushMsgToCore, DeviceAttributesEventNotificationMsg.onDelete, user.getTenantId, scope.name, result.setResult, result.setResult, JsonParser.parseString, json.isJsonObject, JsonConverter.convertToAttributes, attributes.isEmpty, attributeKvEntry.getKey, accessValidator.validateEntityAndCallback, tsSubService.saveAttributes, AttributesSaveRequest.builder, result.setResult, AccessValidator.handleError, JsonParser.parseString, JsonConverter.convertToTelemetry, System.currentTimeMillis, e.getMessage, telemetryRequest.entrySet, entry.getValue, entries.add, entry.getKey, entries.isEmpty, accessValidator.validateEntityAndCallback, SYS_TENANT_ID.equals, tenantProfileCache.get, DAYS.toSeconds, tenantProfile.getProfileData, tsSubService.saveTimeseries, TimeseriesSaveRequest.builder, user.getCustomerId, result.setResult, AccessValidator.handleError, keys.isEmpty, tsService.findAllLatest, user.getTenantId, tsService.findLatest, user.getTenantId, Futures.addCallback, MoreExecutors.directExecutor, keys.isEmpty, Futures.addCallback, attributesService.find, user.getTenantId, MoreExecutors.directExecutor, Futures.addCallback, attributesService.findAll, user.getTenantId, MoreExecutors.directExecutor, AttributeScope.values, keys.isEmpty, futures.add, attributesService.find, user.getTenantId, futures.add, attributesService.findAll, user.getTenantId, Futures.addCallback, MoreExecutors.directExecutor, Futures.addCallback, attributesService.findAll, MoreExecutors.directExecutor, AttributeScope.values, futures.add, attributesService.findAll, Futures.addCallback, MoreExecutors.directExecutor, values.stream, Collectors.toList, response.setResult, AccessValidator.handleError, attributes.stream, Collectors.toList, response.setResult, AccessValidator.handleError, attributes.stream, attribute.getLastUpdateTs, attribute.getKey, Collectors.toList, response.setResult, AccessValidator.handleError, entry.getValueAsString, result.computeIfAbsent, entry.getKey, entry.getTs, response.setResult, AccessValidator.handleError, logEntityActionService.logEntityAction, user.getTenantId, logEntityActionService.logEntityAction, user.getTenantId, logEntityActionService.logEntityAction, user.getTenantId, logEntityActionService.logEntityAction, user.getTenantId, logEntityActionService.logEntityAction, user.getTenantId, Futures.transform, Futures.successfulAsList, input.forEach, StringUtils.isEmpty, Arrays.asList, keys.split, Collections.emptyList, result.setResult, JacksonUtil.toJsonNode, entry.getDataType, entry.getJsonValue, entry.getValue

#### Dependencies
- TimeseriesService, AccessValidator

#### Usage Flow
Called by UI: `trendz-settings.service.ts, audit-log.service.ts, user-settings.service.ts, calculated-fields.service.ts, entity.service.ts, api-key.service.ts, resource.service.ts, ai-model.service.ts, queue.service.ts, notification.service.ts, component-descriptor.service.ts, edge.service.ts, widget.service.ts, rule-chain.service.ts, customer.service.ts, asset.service.ts, alarm-rules.service.ts, alarm.service.ts, dashboard.service.ts, domain.service.ts, user.service.ts, device.service.ts, tenant.service.ts, entity-view.service.ts, mobile-app.service.ts, oauth2.service.ts, admin.service.ts, entity-relation.service.ts, asset-profile.service.ts, ui-settings.service.ts, auth.service.ts, image.service.ts, ota-package.service.ts, two-factor-authentication.service.ts, device-profile.service.ts, tenant-profile.service.ts, attribute.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

## Domain: Tenant / Customer

### Get Tenant (getTenantById)

**Endpoint:** `GET /api/tenant/{tenantId}`

#### Purpose
Fetch the Tenant object based on the provided Tenant Id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `Tenant`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls TenantId.fromUUID, tenant.getAdditionalInfo

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `device.service.ts, tenant.service.ts, entity-view.service.ts, asset.service.ts, dashboard.service.ts, edge.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Tenant Info (getTenantInfoById)

**Endpoint:** `GET /api/tenant/info/{tenantId}`

#### Purpose
Fetch the Tenant Info object based on the provided Tenant Id.

#### Authentication
Required: Yes
Expression: `hasAuthority('SYS_ADMIN')`

#### Request

#### Response
- **Success:** `TenantInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls TenantId.fromUUID

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `tenant.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Create Or update Tenant (saveTenant)

**Endpoint:** `POST /api/tenant`

#### Purpose
Create or update the Tenant. When creating tenant, platform generates Tenant Id as

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Body Schema:** `Tenant`

#### Response
- **Success:** `Tenant`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tenant.getId, tbTenantService.save

#### Dependencies
- TbTenantService

#### Usage Flow
Called by UI: `tenant.service.ts, tenant-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete Tenant (deleteTenant)

**Endpoint:** `DELETE /api/tenant/{tenantId}`

#### Purpose
Deletes the tenant, it's customers, rule chains, devices and all other related entities. Referencing non-existing tenant Id will cause an error.

#### Authentication
Required: Yes
Expression: `hasAuthority('SYS_ADMIN')`

#### Request

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls TenantId.fromUUID, tbTenantService.delete

#### Dependencies
- TbTenantService

#### Usage Flow
Called by UI: `device.service.ts, tenant.service.ts, entity-view.service.ts, asset.service.ts, tenant-profile.service.ts, dashboard.service.ts, edge.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Tenants (getTenants)

**Endpoint:** `GET /api/tenants`

#### Purpose
Returns a page of tenants registered in the platform.

#### Authentication
Required: Yes
Expression: `hasAuthority('SYS_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<Tenant>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tenantService.findTenants

#### Dependencies
- TenantService

#### Usage Flow
Called by UI: `entity.service.ts, tenant.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Tenants Info (getTenants)

**Endpoint:** `GET /api/tenantInfos`

#### Purpose
Returns a page of tenant info objects registered in the platform.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<TenantInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tenantService.findTenantInfos

#### Dependencies
- TenantService

#### Usage Flow
Called by UI: `tenant.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getTenantsByIdsV1

**Endpoint:** `GET /api/tenants`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `tenantIds` (Set<UUID>) in query

#### Response
- **Success:** `List<Tenant>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tenantIds.add, TenantId.fromUUID, tenantService.findTenantsByIds

#### Dependencies
- TenantService

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Tenants list (getTenantsByIds)

**Endpoint:** `GET /api/tenants/list`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `tenantIds` (Set<UUID>) in query

#### Response
- **Success:** `List<Tenant>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tenants.stream, accessControlService.hasPermission, tenant.getId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, tenant.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Tenant Profile (getTenantProfileById)

**Endpoint:** `GET /api/tenantProfile/{tenantProfileId}`

#### Purpose
Fetch the Tenant Profile object based on the provided Tenant Profile Id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN')`

#### Request
- **Parameters:**
  - `tenantProfileId` (String) in path

#### Response
- **Success:** `TenantProfile`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `tenant-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Tenant Profile Info (getTenantProfileInfoById)

**Endpoint:** `GET /api/tenantProfileInfo/{tenantProfileId}`

#### Purpose
Fetch the Tenant Profile Info object based on the provided Tenant Profile Id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN')`

#### Request
- **Parameters:**
  - `tenantProfileId` (String) in path

#### Response
- **Success:** `EntityInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tenantProfileService.findTenantProfileInfoById

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `tenant-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get default Tenant Profile Info (getDefaultTenantProfileInfo)

**Endpoint:** `GET /api/tenantProfileInfo/default`

#### Purpose
Fetch the default Tenant Profile Info object based.

#### Authentication
Required: Yes
Expression: `hasAuthority('SYS_ADMIN')`

#### Request

#### Response
- **Success:** `EntityInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tenantProfileService.findDefaultTenantProfileInfo

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `tenant-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Create Or update Tenant Profile (saveTenantProfile)

**Endpoint:** `POST /api/tenantProfile`

#### Purpose
Create or update the Tenant Profile. When creating tenant profile, platform generates Tenant Profile Id as

#### Authentication
Required: Yes
Expression: `hasAuthority('SYS_ADMIN')`

#### Request
- **Body Schema:** `TenantProfile`

#### Response
- **Success:** `TenantProfile`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tenantProfile.getId, accessControlService.checkPermission, tenantProfile.getId, tbTenantProfileService.save

#### Dependencies
- TbTenantProfileService

#### Usage Flow
Called by UI: `tenant-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete Tenant Profile (deleteTenantProfile)

**Endpoint:** `DELETE /api/tenantProfile/{tenantProfileId}`

#### Purpose
Deletes the tenant profile. Referencing non-existing tenant profile Id will cause an error. Referencing profile that is used by the tenants will cause an error.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN')`

#### Request
- **Parameters:**
  - `tenantProfileId` (String) in path

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbTenantProfileService.delete

#### Dependencies
- TbTenantProfileService

#### Usage Flow
Called by UI: `tenant-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Make tenant profile default (setDefaultTenantProfile)

**Endpoint:** `POST /api/tenantProfile/{tenantProfileId}/default`

#### Purpose
Makes specified tenant profile to be default. Referencing non-existing tenant profile Id will cause an error.

#### Authentication
Required: Yes
Expression: `hasAuthority('SYS_ADMIN')`

#### Request
- **Parameters:**
  - `tenantProfileId` (String) in path

#### Response
- **Success:** `TenantProfile`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbTenantProfileService.setDefaultTenantProfile

#### Dependencies
- TbTenantProfileService

#### Usage Flow
Called by UI: `tenant-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Tenant Profiles (getTenantProfiles)

**Endpoint:** `GET /api/tenantProfiles`

#### Purpose
Returns a page of tenant profiles registered in the platform.

#### Authentication
Required: Yes
Expression: `hasAuthority('SYS_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<TenantProfile>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tenantProfileService.findTenantProfiles

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, tenant-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Tenant Profiles Info (getTenantProfileInfos)

**Endpoint:** `GET /api/tenantProfileInfos`

#### Purpose
Returns a page of tenant profile info objects registered in the platform.

#### Authentication
Required: Yes
Expression: `hasAuthority('SYS_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<EntityInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tenantProfileService.findTenantProfileInfos

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `tenant-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getTenantProfilesByIds

**Endpoint:** `GET /api/tenantProfiles`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAuthority('SYS_ADMIN')`

#### Request

#### Response
- **Success:** `List<TenantProfile>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tenantProfileService.findTenantProfilesByIds

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, tenant-profile.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Tenant Profile list (getTenantProfileList)

**Endpoint:** `GET /api/tenantProfiles/list`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAuthority('SYS_ADMIN')`

#### Request

#### Response
- **Success:** `List<TenantProfile>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Customer (getCustomerById)

**Endpoint:** `GET /api/customer/{customerId}`

#### Purpose
Get the Customer object based on the provided Customer Id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `Customer`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls customer.getAdditionalInfo

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `customer.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get short Customer info (getShortCustomerInfoById)

**Endpoint:** `GET /api/customer/{customerId}/shortInfo`

#### Purpose
Get the short customer object that contains only the title and 'isPublic' flag.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `JsonNode`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls JacksonUtil.newObjectNode, infoObject.put, customer.getTitle, infoObject.put, customer.isPublic

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Customer Title (getCustomerTitleById)

**Endpoint:** `GET /api/customer/{customerId}/title`

#### Purpose
Get the title of the customer.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `String`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls customer.getTitle

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Create or update Customer (saveCustomer)

**Endpoint:** `POST /api/customer`

#### Purpose
Creates or Updates the Customer. When creating customer, platform generates Customer Id as

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Body Schema:** `Customer`

#### Response
- **Success:** `Customer`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls parameters.RequestBody, customer.setTenantId, customer.getId, tbCustomerService.save

#### Dependencies
- TbCustomerService

#### Usage Flow
Called by UI: `customer.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete Customer (deleteCustomer)

**Endpoint:** `DELETE /api/customer/{customerId}`

#### Purpose
Deletes the Customer and all customer Users.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbCustomerService.delete

#### Dependencies
- TbCustomerService

#### Usage Flow
Called by UI: `customer.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Tenant Customers (getCustomers)

**Endpoint:** `GET /api/customers`

#### Purpose
Returns a page of customers owned by tenant.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<Customer>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls customerService.findCustomersByTenantId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, customer.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Tenant Customer by Customer title (getTenantCustomer)

**Endpoint:** `GET /api/tenant/customers`

#### Purpose
Get the Customer using Customer Title.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `customerTitle` (String) in query

#### Response
- **Success:** `Customer`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls customerService.findCustomerByTenantIdAndTitle

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getCustomersByIdsV1

**Endpoint:** `GET /api/customers`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `customerIds` (Set<UUID>) in query

#### Response
- **Success:** `List<Customer>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls customerIds.add, customerService.findCustomersByTenantIdAndIds

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get customers by Customer Ids (getCustomersByIds)

**Endpoint:** `GET /api/customers/list`

#### Purpose
Returns a list of Customer objects based on the provided ids.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `customerIds` (Set<UUID>) in query

#### Response
- **Success:** `List<Customer>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, customer.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

## Domain: User & Role Management

### Get User (getUserById)

**Endpoint:** `GET /api/user/{userId}`

#### Purpose
Fetch the User object based on the provided User Id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `User`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `user-settings.service.ts, user.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Check Token Access Enabled (isUserTokenAccessEnabled)

**Endpoint:** `GET /api/user/tokenAccessEnabled`

#### Purpose
Checks that the system is configured to allow administrators to impersonate themself as other users.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `boolean`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get User Token (getUserToken)

**Endpoint:** `GET /api/user/{userId}/token`

#### Purpose
Returns the token of the User based on the provided User Id.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `JwtPair`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls user.getEmail, userService.findUserCredentialsByUserId, authUser.getTenantId, credentials.isEnabled, tokenFactory.createTokenPair

#### Dependencies
- JwtTokenFactory

#### Usage Flow
Called by UI: `auth.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Save Or update User (saveUser)

**Endpoint:** `POST /api/user`

#### Purpose
Create or update the User. When creating user, platform generates User Id as

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Body Schema:** `User`

#### Response
- **Success:** `User`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls SYS_ADMIN.equals, user.setTenantId, user.getId, tbUserService.save

#### Dependencies
- TbUserService

#### Usage Flow
Called by UI: `user-settings.service.ts, user.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Send or re-send the activation email

**Endpoint:** `POST /api/user/sendActivationMail`

#### Purpose
Force send the activation email to the user. Useful to resend the email if user has accidentally deleted it.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `email` (String) in query

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls userService.findUserByEmail, securityUser.getTenantId, accessControlService.checkPermission, user.getId, tbUserService.getActivationLink, securityUser.getTenantId, securityUser.getCustomerId, user.getId, mailService.sendActivationEmail, activationLink.value, activationLink.ttlMs

#### Dependencies
- MailService, TbUserService

#### Usage Flow
Called by UI: `user.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get activation link (getActivationLink)

**Endpoint:** `GET /api/user/{userId}/activationLink`

#### Purpose
Get the activation link for the user.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `String`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `user.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get activation link info (getActivationLinkInfo)

**Endpoint:** `GET /api/user/{userId}/activationLinkInfo`

#### Purpose
Get the activation link info for the user.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request

#### Response
- **Success:** `UserActivationLink`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls tbUserService.getActivationLink, securityUser.getTenantId, securityUser.getCustomerId

#### Dependencies
- TbUserService

#### Usage Flow
Called by UI: `user.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete User (deleteUser)

**Endpoint:** `DELETE /api/user/{userId}`

#### Purpose
Deletes the User, it's credentials and all the relations (from and to the User).

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls user.getAuthority, user.getAuthority, userService.countTenantAdmins, user.getTenantId, tbUserService.delete

#### Dependencies
- TbUserService

#### Usage Flow
Called by UI: `auth.effects.ts, user-settings.service.ts, user.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Users (getUsers)

**Endpoint:** `GET /api/users`

#### Purpose
Returns a page of users owned by tenant or customer. The scope depends on authority of the user that performs the request.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<User>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls TENANT_ADMIN.equals, currentUser.getAuthority, userService.findUsersByTenantId, currentUser.getTenantId, userService.findCustomerUsers, currentUser.getTenantId, currentUser.getCustomerId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, user.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Find users by query (findUsersByQuery)

**Endpoint:** `GET /api/users/info`

#### Purpose
Returns page of user data objects. Search is been executed by email, firstName and

#### Authentication
Required: Yes
Expression: `hasAuthority('SYS_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<UserEmailInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls entityFilter.setEntityType, Arrays.asList, entityQueryService.findEntityDataByQuery, entityData.getLatest, UserId.fromString, entityData.getEntityId, fieldValues.get, fieldValues.get, fieldValues.get

#### Dependencies
- EntityQueryService

#### Usage Flow
Called by UI: `user.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Tenant Users (getTenantAdmins)

**Endpoint:** `GET /api/tenant/{tenantId}/users`

#### Purpose
Returns a page of users owned by tenant.

#### Authentication
Required: Yes
Expression: `hasAuthority('TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<User>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls TenantId.fromUUID, userService.findTenantAdmins

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `user.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Customer Users (getCustomerUsers)

**Endpoint:** `GET /api/customer/{customerId}/users`

#### Purpose
Returns a page of users owned by customer.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN')`

#### Request
- **Parameters:**
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<User>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls userService.findCustomerUsers

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `user.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Enable/Disable User credentials (setUserCredentialsEnabled)

**Endpoint:** `POST /api/user/{userId}/userCredentialsEnabled`

#### Purpose
Enables or Disables user credentials. Useful when you would like to block user account without deleting it.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls userService.setUserCredentialsEnabled, eventPublisher.publishEvent

#### Dependencies
- ApplicationEventPublisher

#### Usage Flow
Called by UI: `user.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get usersForAssign (getUsersForAssign)

**Endpoint:** `GET /api/users/assign/{alarmId}`

#### Purpose
Returns page of user data objects that can be assigned to provided alarmId.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `alarmId` (String) in path
  - `pageSize` (int) in query
  - `page` (int) in query

#### Response
- **Success:** `PageData<UserEmailInfo>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls currentUser.getTenantId, entityService.fetchEntityCustomerId, alarm.getOriginator, TENANT_ADMIN.equals, currentUser.getAuthority, alarm.getCustomerId, userService.findTenantAdmins, Collections.singletonList, NULL_UUID.equals, originatorCustomerId.getId, customerIds.add, userService.findUsersByCustomerIds, userService.findCustomerUsers, alarm.getCustomerId, pageData.mapData, user.getId, user.getEmail, user.getFirstName, user.getLastName

#### Dependencies
- EntityService

#### Usage Flow
Called by UI: `user.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Save user settings (saveUserSettings)

**Endpoint:** `POST /api/user/settings`

#### Purpose
Save user settings represented in json format for authorized user.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Body Schema:** `JsonNode`

#### Response
- **Success:** `JsonNode`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls userSettings.setType, userSettings.setSettings, userSettings.setUserId, currentUser.getId, userSettingsService.saveUserSettings, currentUser.getTenantId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `user-settings.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### putUserSettings

**Endpoint:** `PUT /api/user/settings`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Body Schema:** `JsonNode`

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls userSettingsService.updateUserSettings, currentUser.getTenantId, currentUser.getId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `auth.effects.ts, user-settings.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Update user settings (putGeneralUserSettings)

**Endpoint:** `PUT /api/user/settings/general`

#### Purpose
Update user settings for authorized user. Only specified json elements will be updated.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Body Schema:** `JsonNode`

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getUserSettings

**Endpoint:** `GET /api/user/settings`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `JsonNode`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls userSettingsService.findUserSettings, currentUser.getTenantId, currentUser.getId, JacksonUtil.newObjectNode, userSettings.getSettings

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `user-settings.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get user settings (getGeneralUserSettings)

**Endpoint:** `GET /api/user/settings/general`

#### Purpose
Fetch the User settings based on authorized user.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `JsonNode`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete user settings (deleteGeneralUserSettings)

**Endpoint:** `DELETE /api/user/settings/{paths}`

#### Purpose
Delete user settings by specifying list of json element xpaths. \n

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls userSettingsService.deleteUserSettings, currentUser.getTenantId, currentUser.getId, Arrays.asList, paths.split

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `user-settings.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Update user settings (putUserSettings)

**Endpoint:** `PUT /api/user/settings/{type}`

#### Purpose
Update user settings for authorized user. Only specified json elements will be updated.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `type` (String) in path
- **Body Schema:** `JsonNode`

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls userSettingsService.updateUserSettings, currentUser.getTenantId, currentUser.getId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `auth.effects.ts, user-settings.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get user settings (getUserSettings)

**Endpoint:** `GET /api/user/settings/{type}`

#### Purpose
Fetch the User settings based on authorized user.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `type` (String) in path

#### Response
- **Success:** `JsonNode`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls userSettingsService.findUserSettings, currentUser.getTenantId, currentUser.getId, JacksonUtil.newObjectNode, userSettings.getSettings

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `user-settings.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Delete user settings by type (deleteUserSettingsByType)

**Endpoint:** `DELETE /api/user/settings/{type}/{paths}`

#### Purpose
Delete user settings by specifying list of json element xpaths. \n

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `type` (String) in path

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls userSettingsService.deleteUserSettings, currentUser.getTenantId, currentUser.getId, Arrays.asList, paths.split

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getUserDashboardsInfo

**Endpoint:** `GET /api/user/dashboards`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `UserDashboardsInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls userSettingsService.findUserDashboardsInfo, currentUser.getTenantId, currentUser.getId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `user-settings.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get information about last visited and starred dashboards (getLastVisitedDashboards)

**Endpoint:** `GET /api/user/lastVisitedDashboards`

#### Purpose
Fetch the list of last visited and starred dashboards. Both lists are limited to 10 items.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `UserDashboardsInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Internal platform logic.

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Report action of User over the dashboard (reportUserDashboardAction)

**Endpoint:** `GET /api/user/dashboards/{dashboardId}/{action}`

#### Purpose
Report action of User over the dashboard.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `action` (String) in path

#### Response
- **Success:** `UserDashboardsInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls userSettingsService.reportUserDashboardAction, currentUser.getTenantId, currentUser.getId

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `user-settings.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getMobileSession

**Endpoint:** `GET /api/user/mobile/session`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `MobileSessionInfo`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls userService.findMobileSession, user.getTenantId, user.getId

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### saveMobileSession

**Endpoint:** `POST /api/user/mobile/session`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('SYS_ADMIN', 'TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Body Schema:** `MobileSessionInfo`

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls userService.saveMobileSession, user.getTenantId, user.getId

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### removeMobileSession

**Endpoint:** `DELETE /api/user/mobile/session`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request

#### Response
- **Success:** `void`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls userService.removeMobileSession, user.getTenantId

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### getUsersByIdsV1

**Endpoint:** `GET /api/users`

#### Purpose
No description provided in source.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `userIds` (Set<UUID>) in query

#### Response
- **Success:** `List<User>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls userIds.add, userService.findUsersByTenantIdAndIds

#### Dependencies
- Standard platform services.

#### Usage Flow
Internal or System API usage.

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---

### Get Users By Ids (getUsersByIds)

**Endpoint:** `GET /api/users/list`

#### Purpose
Requested users must be owned by tenant or assigned to customer which user is performing the request.

#### Authentication
Required: Yes
Expression: `hasAnyAuthority('TENANT_ADMIN', 'CUSTOMER_USER')`

#### Request
- **Parameters:**
  - `userIds` (Set<UUID>) in query

#### Response
- **Success:** `List<User>`
- **Status Codes:** 200 OK (Success), 401 Unauthorized, 403 Forbidden, 404 Not Found

#### Business Logic
Calls users.stream, accessControlService.hasPermission, user.getId, Collectors.toList, type.isReserved

#### Dependencies
- Standard platform services.

#### Usage Flow
Called by UI: `entity.service.ts, user.service.ts`

#### Risks / Edge Cases
- Permission checks are enforced via Spring Security.
- Input validation is handled by JSR-303 annotations where applicable.

---
