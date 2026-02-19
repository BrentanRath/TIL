Today I learned that you can configure a Windows ISO file for Windows 10/11 before you even install it using [Answer files (unattend.xml/autounattend.xml)](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/update-windows-settings-and-scripts-create-your-own-answer-file-sxs?view=windows-11). You can change many things from the users it sets up, to the keyboard and language settings, all the way to running custom PowerShell scripts on startup.

My friend pointed this out to me, and as a Linux and MacOS user, this was a surprise for me to see, but a good tool for corporate environments, as well as debloating a new machine. Someone made a [generator website](https://schneegans.de/windows/unattend-generator/) that lets you create the autounattend.xml file.

Here are the kinds of things you can configure:

## General Setup & Region

- **Import/Presets:** Import existing XML or choose predefined presets.
- **Region and Language:** Display language, keyboard layouts, and home location.
- **Processor Architectures:** x86, amd64, or arm64.
- **Setup Settings:** Bypass TPM/Secure Boot, offline installation, distribution shares, and Narrator.
- **Computer Name:** [Random, manual, or scripted names.](https://learn.microsoft.com/en-us/windows-hardware/customize/desktop/unattend/microsoft-windows-shell-setup-computername)
- **Compact OS:** Enable or disable file compression.
- **Time Zone:** Automatic or explicit selection.

## Disk & Windows Edition

- **Partitioning:** Interactive, automatic (GPT/MBR), or custom Diskpart scripts.
- **Windows RE:** Recovery partition placement or removal.
- **Windows Edition:** Generic keys, manual keys, or BIOS/UEFI firmware keys.
- **Source Image:** Selection by index or name.
- **Windows PE Operation:** Standard setup or custom CMD scripts.

## Accounts & Security

- **User Accounts:** Local accounts, auto-logon, and password obscuring.
- **Password Policy:** Expiration dates and lockout thresholds.
- **System Tweaks:** Disable Windows Defender, UAC, SmartScreen, and Windows Update.
- **Security Policies:** Windows Defender Application Control (WDAC) and AppLocker.

## Interface & Customization

- **File Explorer:** Hidden files, file extensions, classic context menu, and "This PC" view.
- **Start Menu & Taskbar:** Search box style, taskbar alignment, widgets, and tray icons.
- **Start/Taskbar Layout:** Custom XML/JSON pins for Windows 10 and 11.
- **Visual Effects:** Performance vs. appearance and custom animation toggles.
- **Desktop & Start Folders:** System icons and folders next to the Power button.
- **Personalization:** Dark/Light themes, accent colors, and custom wallpapers.

## System & Software

- **Remove Bloatware:** Selection list for removing built-in apps (Camera, OneDrive, Xbox, etc.).
- **System Optimizations:** Fast Startup, Long Paths, RDP, and hibernating settings.
- **Edge Settings:** Disable First Run Experience, Startup Boost, or make it uninstallable.
- **Virtual Machine Support:** Guest tools for VirtualBox, VMware, Proxmox, and Parallels.
- **Wi-Fi Setup:** SSID and password configuration.
- **Custom Scripts:** Run Synchronous (System), Default User (Registry), First Logon, or User Once scripts.

## Advanced

- **XML Markup:** Manual injection of XML for specific components.
- **Download Settings:** Option to rename the file to notautounattend.xml.

<details class="til-collapsible">
<summary>Sample autounattend.xml &amp; downloads</summary>

Here's the answer file I created. Place `autounattend.xml` in the root of your USB drive next to the ISO (or inside the ISO's `sources` folder for some setups). You can copy the full XML below.

I removed a lot of applications that are not needed, added a custom wallpaper, custom timezone, computer name, accounts. That's really about it. Overall I am not a fan of Windows 11 or 10, but it is what it is, and still the best for gaming.

<pre><code id="autounattend-xml"></code></pre>

**Downloads:**

- <a href="../../assets/downloads/autounattend.xml" download>autounattend.xml</a>

</details>

### References

- [Answer files (unattend.xml)](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/update-windows-settings-and-scripts-create-your-own-answer-file-sxs?view=windows-11) — Microsoft Learn
- [autounattend.xml generator](https://schneegans.de/windows/unattend-generator/) — Web-based answer file builder
- [Sample PowerShell startup scripts](https://schneegans.de/windows/unattend-generator/samples/) — Example scripts for autounattend.xml
- [ComputerName](https://learn.microsoft.com/en-us/windows-hardware/customize/desktop/unattend/microsoft-windows-shell-setup-computername) — Microsoft Learn (unattend.xml setting)

<img src="../../assets/images/rabbit_meme_1.png" alt="Sorry, I'm too cute to care what you think" class="til-meme">
