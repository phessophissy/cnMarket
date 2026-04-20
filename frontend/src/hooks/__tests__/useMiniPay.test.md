# useMiniPay Hook Test Plan

## Test Cases
1. Returns isMiniPay=false when window.ethereum is undefined
2. Returns isMiniPay=true when window.ethereum.isMiniPay is true
3. Auto-connects when MiniPay is detected
4. isLoading transitions from true to false
5. Returns correct address after connection
