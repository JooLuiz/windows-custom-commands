# windows-custom-commands

The Windows Custom Commands project aims to provide new commands to be executed in Windows PowerShell.

## 1. How to Create New Commands in Windows

First of all, it is important to explain how to create new commands in Windows. To do this, you will need to add some things to your `$PROFILE` file.

### 1.1 Accessing the Profile

To access `$PROFILE`, just open your PowerShell and run the following command:

```powershell
notepad $PROFILE
```

> **_TIP:_** if you prefer, open `$PROFILE` in another app like VSCode or Sublime.

### 1.2 Adding Commands

This file loads every time you open the terminal in Windows, so everything you put in it becomes the "default terminal settings."

Thus, there are two ways (that I know) to create new commands in our terminal, and both involve modifying our `$PROFILE` file.

#### 1.2.1 Adding Aliases

The first is by adding new aliases to `$PROFILE`. You can do this with the following command:

```powershell
New-Alias -Name my-command -Value Path\To\My\Command.bat
```

Now, what is happening here?

| Action      | Definition |
|-----------|-----------|
| New-Alias | Creates aliases that associate commands with specific files, [click here for more information](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/new-alias?view=powershell-7.4) |
| -Name | Defines the name of the command to be executed in PowerShell; in this example, it would be "my-command"     |
| -Value | Defines which file will be called when the command is executed |

#### 1.2.2 Creating Functions

The other way you can create new commands is by adding functions to `$PROFILE`, for example:

```powershell
Function my-custom-command {
    param (
        [string[]]$ExtraArgs
    )
    $loginCommand = "my-command"
    $loginCommand += " --my-parameter=my-value"
    echo $ExtraArgs
    foreach ($arg in $ExtraArgs) {
        echo $arg
        if ($arg.StartsWith("--")) {
            $loginCommand += " $arg"
        } elseif ($arg.StartsWith("-")) {
            $loginCommand += " $arg"
        } else {
            $loginCommand += " '$arg'"
        }
    }
    Invoke-Expression $loginCommand
}
```

In this case, we are creating a function called `my-custom-command`, which calls the previously defined command `my-command`, passing specific parameters.

## 2 Installation

Once you clone this repository, run the following command to install the app dependencies:

```shell
npm install
```

## 3. Available Commands

### 3.1 login

#### 3.1.1 Specifications

The `login` command opens a browser and logs in according to the settings. It accepts the following parameters:

| Long Parameter | Short Parameter  | Required | Description |
|---|---|---| --- |
| --action  | -a  | YES  | Indicates the action the login will perform    |
|  --verbose | -v  | NO  | Indicates whether to display logs during execution    |

#### 3.1.2 Configuration

Before using the `login` command, you need to configure the desired actions. To do this, you need to create the `config.json` file in the `./config/` directory. There is an example of how this config should look in the same folder, and it is structured like this:

```json
{
  "browseAndLogin": {
    "[actions]": {
      "url": "",
      "usernameInput": "",
      "usernameValue": "",
      "passwordInput": "",
      "passwordValue": "",
      "loginButton": ""
    }
  }
}
```

Let's say you want to create a command that logs into your email. To do this, just replace "[action]" with "log-email" and fill in the other fields according to the access form IDs and your data.

> **_TIP:_** as browseAndLogin is an object of objects, you can have `n` login actions for different sites, as long as you add them to the config file properly.

Now you need to configure the command in your `$PROFILE`, as mentioned in step 1.2 of this README.

So, just add the following code to `$PROFILE`:

```powershell
New-Alias -Name login -Value Path\To\Your\Cloned\Repo\browse-and-login\browse-and-login.bat

Function log-email {
    param (
        [string[]]$ExtraArgs
    )
    $loginCommand = "login"
    $loginCommand += " --action=log-email"
    echo $ExtraArgs
    foreach ($arg in $ExtraArgs) {
        echo $arg
        if ($arg.StartsWith("--")) {
            $loginCommand += " $arg"
        } elseif ($arg.StartsWith("-")) {
            $loginCommand += " $arg"
        } else {
            $loginCommand += " '$arg'"
        }
    }
    Invoke-Expression $loginCommand
}
```

What this configuration does is define an alias called login that runs the browse-and-login.bat file in this repository, then creates a function that executes the newly created "login" command, passing by default the argument `--action=log-email`. So, the following commands are equivalent:

```shell
login --action=log-email
```
&
```shell
log-email
```

### 3.2 touch

#### 3.2.1 Specifications

The `touch` command creates a new empty file or updates the modification date of an existing file. It works similarly to the `touch` command in Unix.

For example, the command `touch file.txt` creates the file `file.txt` if it does not exist or updates the modification date to the current time if it already exists.

#### 3.2.2 Configuration

Similarly to the previous command and as mentioned in section 1.2 of this README, you need to configure the command in `$PROFILE`. Once the profile is open, the command looks like this:

```powershell
New-Alias -Name touch -Value Path\To\Your\Cloned\Repo\touch\touch.bat
```

# Other versions

[Readme in Portuguese (PT-BR)](README.pt-br.md)