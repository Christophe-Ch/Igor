# Igor

Igor is a basic Discord bot. It doesn't have that much functionalities, but is growing more and more every day (like a real human... or almost).

## Add Igor to your guild :sparkles:

Just click [this link](https://discordapp.com/oauth2/authorize?client_id=484450144679362590&scope=bot) and you'll be prompted to chose your server!

## Ranks :tophat:

There are 4 ranks :
0. Administrator
1. Moderator
2. User
3. Not registered yet

## Commands :computer:

A command is structured as follows:  
`prefix-command`  
The default prefix is `ig`, so you'd want to write `ig-command`.  
You can list all the commands by typing `ig-commands`.  
Commands are affected by the rank of the user.  
For example, you cannot call `ig-kick` unless you are Moderator.

## Your own Igor? :baby:

### Requirements

You need to have [Node](https://nodejs.org/en/download/) installed on your computer.

### Database :file_folder:

I could have let you do some reverse ingeneering, but [here](https://gist.github.com/ChriisX/37da7db70152004ce70a9d45d35675bd) is a SQL file that builds your database.
The technology I'm using here is MySQL.

### Installation

If you want to have your own Igor, just follow those simple steps:
- Create a new [application](https://discordapp.com/developers/applications/), and get the **Client secret**. This is your **token**. Do **not** under any circumstances reveal it to anyone, or someone else will get the ability to take the control of your bot.
- Clone this repository.
- Install discord js libraries using `npm install discord.js`
- Some files are gitignored (you won't get ma token!), you'll need to create them:
    - config.json ([example](https://gist.github.com/ChriisX/80fac711c553fa71cad3a3da737c04dd))
    - dbconf.json ([example](https://gist.github.com/ChriisX/5156594d43b4160ea705c031bea96b22))

### Launch in 3... 2... 1... :rocket:

Open your terminal and run `node app.js`
