# windows-custom-commands

O projeto Windows Custom Commands tem por objetivo disponibilizar novos comandos para serem executados no PowerShell do Windows.

## 1. Como criar novos comandos no Windows

Antes de tudo, é importante explicar como criar novos comandos no windows. Para fazer isso você precisará adicionar algumas coisas no seu arquivo `$PROFILE`


### 1.1 Acessando o Profile

Para acessar o `$PROFILE` basta abrir o seu PowerShell e rodar o seguinte comando:

``` powershell
notepad $PROFILE
```

> **_DICA:_**  caso prefira, abra o `$PROFILE` em outro app como o VSCode ou o Sublime.

### 1.2 Adicionando comandos

Este arquivo carrega sempre que você abre o terminal no windows, então tudo o que você coloca nele torna-se o "padrão do terminal".

Assim, existem 2 formas (que eu conheço) para criarmos novos comandos no nosso terminal e ambas são modificando nosso arquivo `$PROFILE`

#### 1.2.1 Adicionando Aliases

A primeira é adicionando novos aliases ao `$PROFILE`, você pode fazer isso com o seguinte comando:

```powershell
New-Alias -Name meu-comando -Value Caminho\Para\Meu\Comando.bat
```

Agora, o que está acontecendo?

| Ação      | Definição |
|-----------|-----------|
| New-Alias | Cria aliases que associam comandos a determinados arquivos, [clique aqui para mais informações](https://learn.microsoft.com/pt-br/powershell/module/microsoft.powershell.utility/new-alias?view=powershell-7.4) |
| -Name | Define o nome do comando que será executado no powershell, no caso do exemplo seria "meu-comando"     |
| -Value | Define qual arquivo será chamado quando o comando for executado |

#### 1.2.2 Criando functions

A outra forma que você pode criar novos comando é adicionando functions ao `$PROFILE`, por exemplo:

``` powershell
Function meu-comando-custom {
    param (
        [string[]]$ExtraArgs
    )
    $loginCommand = "meu-comando"
    $loginCommand += " --meu-parametro=meu-valor"
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

Neste caso,estamos criando uma function chamada `meu-comando-custom` e ele chama o comando previamente definido `meu-comando` passando parâmetros específicos.

## 2 Instalação

Assim que você clonar esse repositório rode seguinte comando para instalar as dependências do app

```
npm install
```

## 3. Comandos Disponíveis

### 3.1 login

#### 3.1.1 Especificações

O comando `login` abre um browser e faz o login de acordo com as configurações. Ele aceita os seguintes parâmetros:

| Parâmetro longo | Parâmetro curto  | Obrigatório | Descrição |
|---|---|---| --- |
| --action  | -a  | SIM  | Indica qual ação o login irá realizar    |
|  --verbose | -v  | NÃO  | Indica se irá mostrar logs durante a execução    |

#### 3.1.2 Configuração

Antes de usar o comando `login`, é necessário configurar as ações desejadas. Para isso é preciso criar o arquivo `config.json` no diretório `./config/`, Há um exemplo de como deve ser esse config na mesma pasta e ele é desse jeito:

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

Digamos, então, que você quer fazer um comando que loga no seu email, para isso basta mudar onde está "[action]" por "logar-email" e preencher os outros campos de acordo com os ids do formulário de acesso e seus dados.

> **_DICA:_**  como o browseAndLogin é um objeto de objetos você pode ter `n` ações de login para diferentes sites, desde que as adicionem no arquivo config devidamente.

Agora é preciso configurar o comando no seu `$PROFILE`, como já foi mencionado no step 1.2 desde README.

Assim, basta adicionar o seguinte código no `$PROFILE`:

```powershell
New-Alias -Name login -Value Path\To\Your\Cloned\Repo\browse-and-login\browse-and-login.bat

Function logar-email {
    param (
        [string[]]$ExtraArgs
    )
    $loginCommand = "login"
    $loginCommand += " --action=logar-email"
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

O que essa configuração faz é definir um alias chamado login que roda o arquivo browse-and-login.bat que está nesse repositório e depois cria uma função que executa o comando "login" recem criado passando por padrão o argumento `--action=logar-email`. Ou seja os seguintes comandos são equivalentes:

```
login --action=logar-email
```
&
```
logar-email
```

### 3.2 touch

#### 3.2.1 Especificações

O comando `touch` cria um novo arquivo vazio ou atualiza a data de modificação de um arquivo existente. Ele funciona de maneira semelhante ao comando `touch` no Unix.

Por exemplo, o comando `touch arquivo.txt` cria o arquivo `arquivo.txt` se ele não existir ou atualiza a data de modificação para o momento atual se já existir.

#### 3.2.2 Configuração

De maneira semelhante ao comando anterior e como mencionado na seção 1.2 deste README, é preciso configurar o comando no `$PROFILE`. Uma vez aberto o profile o comando fica da seguinte maneira:

```
New-Alias -Name touch -Value Path\To\Your\Cloned\Repo\touch\touch.bat
```

### 3.3 reinitialize

#### 3.3.1 Especificações

O comando `reinitialize` reinicializa o seu PowerShell, carregando quaisquer novas alterações feitas no seu `$PROFILE` sem que você precise fechar o terminal.

#### 3.3.2 Configuração

da mesma forma que o comando anterior e conforme mencionado na seção 1.2 deste README, você precisa configurar o comando no `$PROFILE`. Uma vez aberto o profile, o comando fica assim:

```powershell
New-Alias -Name reinitialize -Value Caminho\Para\Seu\Repositorio\Clonado\reinitialize\reinitialize.bat
```


# Other versions

[Readme em Inglês (EN)](README.md)
