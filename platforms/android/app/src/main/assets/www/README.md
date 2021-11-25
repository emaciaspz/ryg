

# Generar llaves android
keytool -genkey -v -keystore kronos-mobileapps.keystore -alias kronosmobileapps -keyalg RSA -keysize 2048 -validity 10000

**pasword**: 2567kronosmobileapps2567

```
Enter keystore password:  
Keystore password is too short - must be at least 6 characters
Enter keystore password:  
Re-enter new password: 
What is your first and last name?
  [Unknown]:  Kronos
What is the name of your organizational unit?
  [Unknown]:  Kronos
What is the name of your organization?
  [Unknown]:  R&GEspinosa
What is the name of your City or Locality?
  [Unknown]:  MTY
What is the name of your State or Province?
  [Unknown]:  NL
What is the two-letter country code for this unit?
  [Unknown]:  MX   
Is CN=Kronos, OU=Kronos, O=R&GEspinosa, L=MTY, ST=NL, C=MX correct?
  [no]:  y
```

cordova run android --release -- --keystore=../kronos-mobileapps.keystore --storePassword=2567kronosmobileapps2567 --alias=kronosmobileapps --password=2567kronosmobileapps2567.