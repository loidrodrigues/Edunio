# TODO: Update lib/jwt.ts to use jwt-decode for client-side decoding

- [x] Add import of jwt-decode in lib/jwt.ts
- [x] Modify verifyToken to use jwt-decode and check expiration manually
- [x] Update isLoggedIn to use the updated verifyToken
- [x] Update getUserFromToken to use the updated verifyToken
- [x] Adjust debugToken if needed to reflect new decoding method
- [x] Test functionalities that use these functions
