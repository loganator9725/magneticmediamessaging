# Email Delivery Diagnostic Checklist

**Goal:** Restore inbound email to your magnetic media messaging domain and verify outbound sending is working.

---

## Part 1: Gather DNS Records (5 minutes)

Run these PowerShell commands on your computer and **copy the full output** for each.

### Step 1: Open PowerShell
- Press `Win + R`, type `powershell`, and press Enter.

### Step 2: Run each command below and copy the full result

Replace `yourdomain.com` with your actual domain (e.g., `magneticmediamessaging.com`).

**Command 1: Check MX Records (where mail is routed)**
```powershell
Resolve-DnsName -Name yourdomain.com -Type MX
```
*Copy the entire output (Name, Type, TTL, MXExchange, Preference columns).*

**Command 2: Check TXT Records (SPF, DKIM, verification)**
```powershell
Resolve-DnsName -Name yourdomain.com -Type TXT
```
*Copy all lines that start with `yourdomain.com` and show `Strings`.*

**Command 3: Check DMARC Record**
```powershell
Resolve-DnsName -Name _dmarc.yourdomain.com -Type TXT
```
*Copy the output (may be blank, which is fine).*

**Command 4: Alternative MX check (if above doesn't work)**
```powershell
nslookup -type=mx yourdomain.com
```
*Copy the entire output.*

**Command 5: Alternative TXT check (if Command 2 doesn't work)**
```powershell
nslookup -type=txt yourdomain.com
```
*Copy the entire output.*

---

## Part 2: Confirm Email Setup (2 minutes)

Answer these questions:

1. **What is your domain name?**  
   Example: `magneticmediamessaging.com`  
   Answer: `_______________________`

2. **Do you use Google Workspace for this domain?**  
   - [ ] Yes, I have a paid Google Workspace subscription (Gmail for Business)
   - [ ] No, I use personal Gmail and forward domain mail to it
   - [ ] Other (please specify): `_______________________`

3. **What email address should receive domain mail?**  
   Example: `jennifer@magneticmediamessaging.com`  
   Answer: `_______________________`

4. **Can you access your DNS settings?**  
   - [ ] Yes, I can log into my DNS provider (GoDaddy, Namecheap, CloudFlare, your registrar, etc.)
   - [ ] No, I don't have DNS access
   - [ ] Not sure

5. **If you use Google Workspace, do you have Admin Console access?**  
   - [ ] Yes
   - [ ] No
   - [ ] Not applicable

---

## Part 3: Gmail/Google Workspace Checks (3 minutes)

### If using Google Workspace:

1. **Check the Email Log Search** (Admin Console → Reports → Email Log Search)
   - Search for emails sent to your domain in the last 24 hours
   - Take a screenshot of any failed or pending deliveries
   - Note any error messages

2. **Verify the domain is added** (Admin Console → Domains)
   - Confirm your domain shows as "Verified"
   - If not verified, note the verification status

3. **Check forwarding rules** (if applicable)
   - Admin Console → Apps → Google Workspace → Gmail
   - Screenshot any custom routing or forwarding rules that might be blocking mail

### If using personal Gmail with domain forwarding:

1. **Check Gmail filters and forwarding**
   - Gmail Settings → Forwarding and POP/IMAP
   - Gmail Settings → Filters and Blocked Addresses
   - Screenshot any rules that might block domain emails
   - Verify forwarding is enabled and set to the correct Gmail address

2. **Check the Spam and All Mail folders**
   - Check if emails are in Spam instead of Inbox
   - Screenshot if you see any unexpected emails there

---

## Part 4: Provide This Information

**To Logan (digitally or via message):**

Provide the following:

- [ ] PowerShell command outputs from Part 1 (Commands 1–5)
- [ ] Answers to Part 2 questions
- [ ] Screenshots from Part 3 (if applicable)
- [ ] Any error messages or bounce notifications you've received in the last week (copy/paste or screenshot)

---

## Part 5: What Happens Next

Once Logan receives the above, he will:

1. **Analyze DNS records** to confirm MX, SPF, DKIM, and DMARC are set up correctly.
2. **Provide exact DNS record changes** (if needed) via a separate document.
3. **Update the website's email sending function** to use your domain as the sender (already partially done).
4. **Verify Gmail settings** and provide any needed adjustments.
5. **Test end-to-end** to confirm inbound and outbound email work.

---

## Troubleshooting Tips

**If PowerShell commands don't work:**
- Use `nslookup -type=mx yourdomain.com` instead (Windows command line)
- Or use an online tool: https://mxtoolbox.com/ (search your domain, take a screenshot)

**If you can't find your DNS provider:**
- Check where you registered the domain (GoDaddy, Namecheap, BlueHost, AWS Route 53, Cloudflare, etc.)
- Most registrars offer built-in DNS management

**If you're unsure about anything:**
- Take a screenshot and include it in your message to Logan
- Include any error messages verbatim

---

## Expected Timeline

- **DNS propagation:** 15 minutes to 24–48 hours (typically 1–4 hours)
- **Gmail synchronization:** Usually immediate once DNS is correct
- **Testing:** Should be complete within 1 hour of DNS fixes

---

**Questions?** Reach out to Logan with any part of this checklist.
