// made by Aaron Starr
// Copyright, Aaron Starr. All rights reserved. Redistribution of this content, including art, with or without modification, is prohibited. 

// i didnt know about json files and other ways to save and load data, so the inventory system is very limited. Guess something to think about if i make another html thing.

'use strict';

// global var for player data
const playerData = {
    name:"",
    maxhealth:100,
    health:0,
    gold:0,
    level:0,
    xp:0,
    weapon:"",
    weaponBonus:0,
    armor:"",
    armorReduction:0,
    trainingApplied:false,
    trainingAmount:0,
    inventory:{
        healthPotion: 0,
        bomb: 0,
        kingsBlade: 0,
        kingsHilt: 0,
        kingsBarding: 0,
        kingsPlateMetal: 0
    },
    skills:{
        rend: 0,
        block: 0,
        refinedtaste: 0,
        haggle: 0,
        disrespect: 0,
        calculated: 0,
        weighted: 0,
        training: 0,
        tempered: 0,
    },
    skillPoints:0,
    totalKills:0,
    rendTurnsRemaining:0
};

// global var for game data
const gameData = {
    currentLocation:"",
    healthPotionCost:50,
    bombCost:100,
    ironSwordCost:100,
    steelSwordCost:200,
    sharpSteelSwordCost:300,
    imbuedSwordCost:400,
    clothArmorCost:100,
    leatherArmorCost:200,
    breastPlateCost:300,
    fullPlateCost:400,
    haggleApplied:false,
    enemiesRemaining:0,
    currentEnemyType:0,
    currentEnemyHealth:0,
    currentEnemyArmor:0,
    currentEnemyDamage:"0-0",
    mtnEnemies:{
        Imp:25,
        Gobbo:30,
        Wurm:45,
        Snek:20,
        Trap:15,
        Bandit:50
    },
    mtnBoss:{
        BanditSummoner:150
    },
    platEnemies:{
        Gobbo:40,
        Wurm:55,
        Trap:25,
        Boar:60,
        Buffalo:75,
        Raider:90,
        Highwayman:80
    },
    platBoss:{
        ChiefRaider:250
    }
};

/* center page obj constuctor */
function CenterPageObj(title="") 
{
    const obj = {};

    obj.titleName = 'centerPageTitle';
    obj.title = title;
    //obj.titleBar = 'centerPageBar'
    obj.playerNameClass = 'characterName'

    obj.mainMenuName = 'mainMenu';
    obj.mapPageName = 'mapPage';
    obj.characterPageName = 'characterPage';
    obj.inventoryPageName = 'inventoryPage';
    obj.skillPageName = 'skillPage';
    obj.storePageName = 'storePage';
    obj.creditsPageName = 'creditsPage';
    obj.combatPageName = 'combatPage';

    obj.sidenavMapName = 'sidenavMapRow';
    obj.sidenavCreditsName = 'sidenavCreditsRow';
    obj.sidenavCharacterName = 'sidenavCharacterRow';
    obj.sidenavInventoryName = 'sidenavInventoryRow';
    obj.sidenavSkillName = 'sidenavSkillRow';
    obj.sidenavStoreName = 'sidenavStoreRow';
    obj.sidenavSaveName = 'sidenavSaveRow';
    obj.sidenavLoadName = 'sidenavLoadRow';
    obj.sidenavCombatName = 'sidenavCombatRow';

    return obj;
}

//global var
let centerPage = new CenterPageObj();
// centerPageTitle
centerPage.title = document.getElementById(centerPage.titleName);

function sidenavRowClick(rowNum) 
{
    switch(rowNum)
    {
        case 0: // map
            loadMapSheet();
            break;

        case 1: // Character
            loadCharacterSheet();
            break;
        
        case 2: // Inventory
            loadInventorySheet();
            break;
            
        case 3: // Skills
            loadSkillsSheet();
            break;
            
        case 4: // Store
            loadStoreSheet();
            break;

        case 5: // Save
            loadSave();
            break;

        case 6: // Load
            loadLoad();
            break;

        case 7: // Credits
            loadCreditsSheet();
            break;

        case -1: // combat
            goToLocation(gameData.currentLocation,1);
            break;
    }
}

// hide all center page setups
function setAllCenterPagesToHidden()
{
    document.getElementById(centerPage.mainMenuName).hidden = true;
    document.getElementById(centerPage.mapPageName).hidden = true;
    document.getElementById(centerPage.characterPageName).hidden = true;
    document.getElementById(centerPage.inventoryPageName).hidden = true;
    document.getElementById(centerPage.skillPageName).hidden = true;
    document.getElementById(centerPage.storePageName).hidden = true;
    document.getElementById(centerPage.creditsPageName).hidden = true;
    document.getElementById(centerPage.combatPageName).hidden = true;
}

// Hide most sidenav buttons (exclusions apply; such as Save, Load, Credits)
function setMostSideNavToHidden()
{
    document.getElementById(centerPage.sidenavMapName).hidden = true;
    document.getElementById(centerPage.sidenavCharacterName).hidden = true;
    document.getElementById(centerPage.sidenavInventoryName).hidden = true;
    document.getElementById(centerPage.sidenavSkillName).hidden = true;
    document.getElementById(centerPage.sidenavStoreName).hidden = true;
    document.getElementById(centerPage.sidenavCreditsName).hidden = true;
}

// Show most sidenav buttons
function setMostSideNavToVisible()
{
    document.getElementById(centerPage.sidenavMapName).hidden = false;
    document.getElementById(centerPage.sidenavCharacterName).hidden = false;
    document.getElementById(centerPage.sidenavInventoryName).hidden = false;
    document.getElementById(centerPage.sidenavSkillName).hidden = false;
    document.getElementById(centerPage.sidenavStoreName).hidden = false;
    document.getElementById(centerPage.sidenavCreditsName).hidden = false;
}

function setCombatSideNavToVisible()
{
    document.getElementById(centerPage.sidenavCombatName).hidden = false;
}
function setCombatSideNavToHidden()
{
    document.getElementById(centerPage.sidenavCombatName).hidden = true;
}


// ----------------------- LOADERS --------------------------------


// load the center page with the store html
function loadMapSheet()
{
    document.getElementById(centerPage.titleName).innerHTML = "Map";

    setAllCenterPagesToHidden(centerPage);
    document.getElementById(centerPage.mapPageName).hidden = false;
}

// expose the center page with the character html
function loadCharacterSheet()
{
    document.getElementById(centerPage.titleName).innerHTML = "Character";

    setAllCenterPagesToHidden(centerPage);
    document.getElementById(centerPage.characterPageName).hidden = false;
}

// load the center page with the inventory html
function loadInventorySheet()
{
    updateInventoryView();

    document.getElementById(centerPage.titleName).innerHTML = "Inventory";

    setAllCenterPagesToHidden(centerPage);
    document.getElementById(centerPage.inventoryPageName).hidden = false;
}

// load the center page with the skills html
function loadSkillsSheet()
{
    document.getElementById(centerPage.titleName).innerHTML = "Skills";

    setAllCenterPagesToHidden(centerPage);
    document.getElementById(centerPage.skillPageName).hidden = false;
}

// load the center page with the store html
function loadStoreSheet()
{
    document.getElementById(centerPage.titleName).innerHTML = "Store";

    setAllCenterPagesToHidden(centerPage);
    document.getElementById(centerPage.storePageName).hidden = false;
}

// load, save system
function loadSave()
{
    //setMostSideNavToHidden(centerPage);
}

// load, load file system
function loadLoad()
{
    //setMostSideNavToVisible(centerPage);
}

// load the center page with the credits html
function loadCreditsSheet()
{
    document.getElementById(centerPage.titleName).innerHTML = "Credits";

    setAllCenterPagesToHidden(centerPage);
    document.getElementById(centerPage.creditsPageName).hidden = false;
}

function goToLocation(locationName,returnNum)
{
    var nameToSet = ''; // titlebar name
    var nonCombat = true; // how to configure the sidenav and etc

    switch(locationName)
    {
        case 'town':
            nameToSet = 'Roc Town';
            nonCombat = true;
            setLocation("Roc Town");
            break;
        
        case 'dungeon1':
            nameToSet = 'Mtn. Dungeon';
            nonCombat = false;
            setLocation("dungeon1");
            break;
        
        case 'dungeon2':
            nameToSet = 'Plateau Dungeon';
            nonCombat = false;
            setLocation("dungeon2");
            break;
    }
    setAllCenterPagesToHidden(centerPage);
    setMostSideNavToHidden();
    if(nonCombat)
    {
        setCombatSideNavToHidden();

        // show sell button in inventory
        var elements = document.getElementsByClassName('itemButton');
        for(var i = 0; i < elements.length; i++)
        {
            if(elements.item(i).innerHTML == 'Sell')
            {
                elements.item(i).hidden = false;
            }
        }
        setHealth(playerData.maxhealth);
        setMostSideNavToVisible();
        loadCharacterSheet();
    }
    else
    {
        setCombatSideNavToVisible();

        // hide sell button in inventory
        var elements = document.getElementsByClassName('itemButton');
        for(var i = 0; i < elements.length; i++)
        {
            if(elements.item(i).innerHTML == 'Sell')
            {
                elements.item(i).hidden = true;
            }
        }

        // new combat
        if(returnNum != 1)
        {
            // select enemies
            var numberOfEnemies = randomIntFromInterval(3, 5)
            gameData.enemiesRemaining = numberOfEnemies;

            newEnemy(locationName);
        }

        document.getElementById(centerPage.titleName).innerHTML = nameToSet;
        document.getElementById(centerPage.sidenavCharacterName).hidden = false;
        document.getElementById(centerPage.sidenavInventoryName).hidden = false;
        document.getElementById(centerPage.sidenavCreditsName).hidden = false;

        document.getElementById(centerPage.combatPageName).hidden = false;
    }
}

function randomIntFromInterval(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function clearCombatLog()
{
    document.getElementById('damageCalcCombatInfo').innerHTML = "";
    document.getElementById('damageTakenCalcCombatInfo').innerHTML = "";
    document.getElementById('rendCombatInfo').innerHTML = "";
    document.getElementById('calculatedCombatInfo').innerHTML = "";
    document.getElementById('blockCombatInfo').innerHTML = "";
    document.getElementById('disrespectCombatInfo').innerHTML = "";
}


// ----------------- SETTERS --------------------

function newEnemy(locationName)
{
    var enemyName = "Imp";
    var enemyHealth = 0;
    var enemyImg = "assets/enemyImpSprite.svg"
    var enemyArmor = 0;
    var enemyDamageEst = "0-0";
    clearCombatLog();
    if(gameData.enemiesRemaining >= 0)
    {
        if(locationName == "dungeon1")
        {
            var keys = Object.keys(gameData.mtnEnemies);
            enemyName = keys[Math.floor(keys.length * Math.random())];
            enemyHealth = gameData.mtnEnemies[enemyName];
            enemyImg = "assets/enemy" + enemyName + "Sprite.svg"
            enemyDamageEst = "5-15";
            gameData.currentEnemyType = 0;
        }
        if(locationName == "dungeon2")
        {
            var keys = Object.keys(gameData.platEnemies);
            enemyName = keys[Math.floor(keys.length * Math.random())];
            enemyHealth = gameData.platEnemies[enemyName];
            enemyImg = "assets/enemy" + enemyName + "Sprite.svg"
            enemyDamageEst = "15-25";
            gameData.currentEnemyType = 0;
        }
    }
    else // boss
    {
        if(locationName == "dungeon1")
        {
            enemyName = "Bandit Summoner";
            enemyHealth = gameData.mtnBoss["BanditSummoner"];
            enemyImg = "assets/enemyBanditSummonerSprite.svg"
            enemyArmor = 2;
            enemyDamageEst = "10-25";
            gameData.currentEnemyType = 1;
        }
        if(locationName == "dungeon2")
        {
            enemyName = "Chief Raider"
            enemyHealth = gameData.platBoss["ChiefRaider"];
            enemyImg = "assets/enemyChiefRaiderSprite.svg"
            enemyArmor = 4;
            enemyDamageEst = "20-35";
            gameData.currentEnemyType = 1;
        }
        var hasTempered = (playerData.skills["tempered"] >= 1) ? true : false;
        if(hasTempered)
        {
            setHealth(playerData.health + Math.ceil(playerData.maxhealth * .5)); // setHealth() checks for overheal already
        }
    }
    // edit view : enemyName
    var elements = document.getElementsByClassName('enemyName');
    for(var i = 0; i < elements.length; i++)
    {
        elements.item(i).innerHTML = enemyName;
    }

    // edit view : enemyHealth
    var hpElements = document.getElementsByClassName('enemyHealth');
    for(var i = 0; i < hpElements.length; i++)
    {
        hpElements.item(i).innerHTML = enemyHealth;
        gameData.currentEnemyHealth = enemyHealth;
    }

    // edit view : enemyImg
    document.getElementById('combatPageImg').src = enemyImg;
    // edit view : enemyArmor
    document.getElementById('enemyArmor').innerHTML = enemyArmor;
    gameData.currentEnemyArmor = enemyArmor;
    // edit view : enemyDamageEst
    document.getElementById('enemyDamageEst').innerHTML = enemyDamageEst;
    gameData.currentEnemyDamage = enemyDamageEst;

}

// type: 0 = normal. 1 = bomb
function combatAttack(type)
{
    var playerDamageToEnemy = randomIntFromInterval(8,15);
    clearCombatLog();

    if(type == 1)
    {
        playerDamageToEnemy = 100;
    }
    else
    {
        var hasRend = (playerData.skills["rend"] >= 1) ? true : false;
        var hasCalculated = (playerData.skills["calculated"] >= 1) ? true : false;
        var hasTempered = (playerData.skills["tempered"] >= 1) ? true : false;
        var hasWeighted = (playerData.skills["weighted"] >= 1) ? true : false;
        var hasBlock = (playerData.skills["block"] >= 1) ? true : false;
        var hasDisrespect = (playerData.skills["disrespect"] >= 1) ? true : false;
        var calculatedActivated = false;

        if(hasRend)
        {
            if(playerData.rendTurnsRemaining > 0)
            {
                playerData.rendTurnsRemaining -= 1;
                playerDamageToEnemy += 3;
                document.getElementById('rendCombatInfo').innerHTML = "You're in a frenzy, you are Rending your enemy for " + playerData.rendTurnsRemaining + " more turns!";
            }
            else
            {
                var applyRendCheck = randomIntFromInterval(1,5);
                if(applyRendCheck == 1)
                {
                    playerData.rendTurnsRemaining = 5;
                    document.getElementById('rendCombatInfo').innerHTML = "You're in a frenzy, you are Rending your enemy for " + playerData.rendTurnsRemaining + " more turns!";
                }
            }
        }
        if(hasCalculated)
        {
            var applyCalculatedCheck = randomIntFromInterval(1,20);
            if(applyCalculatedCheck == 1)
            {
                calculatedActivated = true;
                document.getElementById('calculatedCombatInfo').innerHTML = "Your giga-brain lets you attack twice!";
            }
        }
        if(hasWeighted && (gameData.currentEnemyArmor > 0))
        {
            if(gameData.currentEnemyArmor == 1)
            {
                playerDamageToEnemy += 1;
            }
            else // weighted penetrates 2 armor. so max is 2
            {
                playerDamageToEnemy += 2;
            }
        }
        playerDamageToEnemy += playerData.weaponBonus;
        if(calculatedActivated)
        {
            playerDamageToEnemy *= 2;
        }
    }
    document.getElementById('damageCalcCombatInfo').innerHTML = "You deal " + playerDamageToEnemy + " damage!";
    var enemyHealth = gameData.currentEnemyHealth;
    enemyHealth -= playerDamageToEnemy;
    gameData.currentEnemyHealth = enemyHealth;

    var gearDropSuccess = 0;
    if(enemyHealth <= 0 && (!gameData.currentEnemyType == 1))
    {
        addToKills();
        addExperience(randomIntFromInterval(25,50));
        gameData.enemiesRemaining -= 1;
        setGold(playerData.gold + randomIntFromInterval(10,20));
        gearDropSuccess = randomIntFromInterval(1,200);
        {
            switch(gearDropSuccess)
            {
                case 1:
                    addToInventory("kingsBarding",1,0);
                    break;

                case 2:
                    addToInventory("kingsPlateMetal",1,0);
                    break;

                case 3:
                    addToInventory("kingsHilt",1,0);
                    break;

                case 4:
                    addToInventory("kingsBlade",1,0);
                    break;

                case 5: case 6:
                    addToInventory("bomb",1,0);
                    break;

                case 7: case 8: case 9: case 10: case 11:
                case 12: case 13: case 14: case 15: case 16:
                    addToInventory("healthPotion",1,0);
                    break;
            }
        }
        newEnemy(gameData.currentLocation);
    }
    else if(enemyHealth <= 0 && gameData.currentEnemyType == 1)
    {
        addToKills();
        addExperience(randomIntFromInterval(50,100));
        setGold(playerData.gold + randomIntFromInterval(35,50));
        gearDropSuccess = randomIntFromInterval(1,100);
        {
            switch(gearDropSuccess)
            {
                case 1:
                    addToInventory("kingsBarding",1,0);
                    break;

                case 2:
                    addToInventory("kingsPlateMetal",1,0);
                    break;

                case 3:
                    addToInventory("kingsHilt",1,0);
                    break;

                case 4:
                    addToInventory("kingsBlade",1,0);
                    break;

                case 5:
                    addToInventory("bomb",1,0);
                    break;

                case 6: case 7: case 8: case 9: case 10:
                    addToInventory("healthPotion",1,0);
                    break;
            }
        }
        goToLocation('town');
    }
    else
    {
        var elements = document.getElementsByClassName('enemyHealth');
        for(var i = 0; i < elements.length; i++)
        {
            elements.item(i).innerHTML = enemyHealth;
            gameData.currentEnemyHealth = enemyHealth;
            
        }

        var reduceDamagePercent = 1.0;
        if(hasBlock)
        {
            var blockSuccess = randomIntFromInterval(1,10);
            if(blockSuccess == 1)
            {
                reduceDamagePercent = .5;
                document.getElementById('blockCombatInfo').innerHTML = "You block half the damage from the enemy!";
            }
        }
        if(hasDisrespect)
        {
            var disrespectSuccess = randomIntFromInterval(1,20);
            if(disrespectSuccess == 1)
            {
                setHealth(playerData.health + Math.ceil(playerData.maxhealth * .05));
                document.getElementById('disrespectCombatInfo').innerHTML = "You Disrespect your foe and just heal for some of your max health.";
            }
        }
        const regexDamage = /^(?<lowerLimit>\d+)-(?<upperLimit>\d+)$/;
        var regexMatch = (gameData.currentEnemyDamage).match(regexDamage);
        var enemyDamageDealt = randomIntFromInterval(parseInt(regexMatch.groups.lowerLimit),parseInt(regexMatch.groups.upperLimit));
        
        enemyDamageDealt = Math.ceil(enemyDamageDealt * reduceDamagePercent); // damage % reduction
        enemyDamageDealt -= playerData.armorReduction; // flat armor reduction
        if(enemyDamageDealt <= 0)
        {
            enemyDamageDealt = 1;
        }
        document.getElementById('damageTakenCalcCombatInfo').innerHTML = "You took " + enemyDamageDealt + " damage!";
        setHealth(playerData.health - enemyDamageDealt);
        if(playerData.health == 0)
        {
            setGold( Math.ceil(playerData.gold / 2) );
            goToLocation('town');
        }
    }
}

// reduce damage from enemy by 50% for this turn.
function combatDefend()
{
    clearCombatLog();

    var reduceDamagePercent = .50;
    if(playerData.rendTurnsRemaining > 0)
    {
        playerData.rendTurnsRemaining -= 1;
        document.getElementById('rendCombatInfo').innerHTML = "You're in a frenzy, try attacking next time. Rending for " + playerData.rendTurnsRemaining + " more turns!";
    }
    if(playerData.skills["block"] >= 1)
    {
        var blockSuccess = randomIntFromInterval(1,10);
        if(blockSuccess == 1)
        {
            reduceDamagePercent = .25;
            document.getElementById('blockCombatInfo').innerHTML = "You block 75% of the damage from the enemy!";
        }
    }
    if(playerData.skills['disrespect'] >= 1)
    {
        var disrespectSuccess = randomIntFromInterval(1,20);;
        if(disrespectSuccess == 1)
        {
            setHealth(playerData.health + Math.ceil(playerData.maxhealth * .05));
            document.getElementById('disrespectCombatInfo').innerHTML = "You Disrespect your foe and just heal for some of your max health.";
        }
    }
    const regexDamage = /^(?<lowerLimit>\d+)-(?<upperLimit>\d+)$/;
    var regexMatch = (gameData.currentEnemyDamage).match(regexDamage);
    var enemyDamageDealt = randomIntFromInterval(parseInt(regexMatch.groups.lowerLimit),parseInt(regexMatch.groups.upperLimit));

    enemyDamageDealt = Math.ceil(enemyDamageDealt * reduceDamagePercent); // damage % reduction
    enemyDamageDealt -= playerData.armorReduction; // flat armor reduction
    if(enemyDamageDealt <= 0)
    {
        enemyDamageDealt = 1;
    }
    setHealth(playerData.health - enemyDamageDealt);
    if(playerData.health == 0)
    {
        setGold( Math.ceil(playerData.gold / 2) );
        goToLocation('town');
    }
}

// 20% chance player loses half their gold
function combatEscape()
{
    var goldLoss = randomIntFromInterval(1,5);
    if(goldLoss == 1)
    {
        setGold( Math.ceil(playerData.gold / 2) );
    }
    goToLocation('town',0)
}


function setName(name)
{
    // update view
    var elements = document.getElementsByClassName(centerPage.playerNameClass);
    for(var i = 0; i < elements.length; i++)
    {
        elements.item(i).innerHTML = name;
    }

    // update data
    playerData.name = name;
}


function setHealth(newHealth)
{
    var elements = document.getElementsByClassName("characterHealth");
    // player death
    if(newHealth <= 0)
    {
        // update view
        for(var i = 0; i < elements.length; i++)
        {
            elements.item(i).innerHTML = "0 HP";
        }

        // update data
        playerData.health = 0;
    }
    else if(newHealth > playerData.maxhealth)
    {
        // update view
        for(var i = 0; i < elements.length; i++)
        {
            elements.item(i).innerHTML = playerData.maxhealth + " HP";
        }

        // update data
        playerData.health = playerData.maxhealth;
    }
    else
    {
        // update view
        for(var i = 0; i < elements.length; i++)
        {
            elements.item(i).innerHTML = newHealth + " HP";
        }

        // update data
        playerData.health = newHealth;
    }
}

function setGold(newGold)
{
    // update view
    var elements = document.getElementsByClassName("characterGold");
    for(var i = 0; i < elements.length; i++)
    {
        elements.item(i).innerHTML = newGold + " GP";
    }

    // update data
    playerData.gold = newGold;
}

// hide lower and higher tier items that arent for purchase
function updateStorePage()
{
    // set a 25% reduction in prices if haggle
    if(playerData.skills["haggle"] == 1 && !gameData.haggleApplied)
    {
        gameData.healthPotionCost = Math.floor(gameData.healthPotionCost * .75);
        gameData.bombCost = Math.floor(gameData.bombCost * .75);
        gameData.ironSwordCost = Math.floor(gameData.ironSwordCost * .75);
        gameData.steelSwordCost = Math.floor(gameData.steelSwordCost * .75);
        gameData.sharpSteelSwordCost = Math.floor(gameData.sharpSteelSwordCost * .75);
        gameData.imbuedSwordCost = Math.floor(gameData.imbuedSwordCost * .75);
        gameData.clothArmorCost = Math.floor(gameData.clothArmorCost * .75);
        gameData.leatherArmorCost = Math.floor(gameData.leatherArmorCost * .75);
        gameData.breastPlateCost = Math.floor(gameData.breastPlateCost * .75);
        gameData.fullPlateCost = Math.floor(gameData.fullPlateCost * .75);

        document.getElementById('healthPotionItemCost').innerHTML = gameData.healthPotionCost;
        document.getElementById('bombItemCost').innerHTML = gameData.bombCost;
        document.getElementById('ironSwordItemCost').innerHTML = gameData.ironSwordCost;
        document.getElementById('steelSwordItemCost').innerHTML = gameData.steelSwordCost;
        document.getElementById('sharpSteelSwordItemCost').innerHTML = gameData.sharpSteelSwordCost;
        document.getElementById('imbuedSwordItemCost').innerHTML = gameData.imbuedSwordCost;
        document.getElementById('clothArmorItemCost').innerHTML = gameData.clothArmorCost;
        document.getElementById('leatherArmorItemCost').innerHTML = gameData.leatherArmorCost;
        document.getElementById('breastPlateItemCost').innerHTML = gameData.breastPlateCost;
        document.getElementById('fullPlateItemCost').innerHTML = gameData.fullPlateCost;

        gameData.haggleApplied = true;
    }
    // hide old gear and upgrades beyond 1 depth
    switch(playerData.weapon)
    {
        case 'Rusty Sword':
            document.getElementById('ironSwordItem').hidden = false;
            break;

        case 'Iron Sword':
            document.getElementById('ironSwordItem').hidden = true;
            document.getElementById('steelSwordItem').hidden = false;
            break;
        
        case 'Steel Sword':
            document.getElementById('steelSwordItem').hidden = true;
            document.getElementById('sharpSteelSwordItem').hidden = false;
            break;
        
        case 'Sharp Steel Sword':
            document.getElementById('sharpSteelSwordItem').hidden = true;
            document.getElementById('imbuedSwordItem').hidden = false;
            break;

        case 'Imbued Sword':
            document.getElementById('imbuedSwordItem').hidden = true;
            break;

        case "King's Sword":
            document.getElementById('ironSwordItem').hidden = true;
            document.getElementById('steelSwordItem').hidden = true;
            document.getElementById('sharpSteelSwordItem').hidden = true;
            document.getElementById('imbuedSwordItem').hidden = true;
            break;
    }
    // hide old gear and upgrades beyond 1 depth
    switch(playerData.armor)
    {
        case 'Tattered Cloth':
            document.getElementById('clothArmorItem').hidden = false;
            break;

        case 'Cloth Armor':
            document.getElementById('clothArmorItem').hidden = true;
            document.getElementById('leatherArmorItem').hidden = false;
            break;
        
        case 'Leather Armor':
            document.getElementById('leatherArmorItem').hidden = true;
            document.getElementById('breastPlateItem').hidden = false;
            break;
        
        case 'Breast Plate':
            document.getElementById('breastPlateItem').hidden = true;
            document.getElementById('fullPlateItem').hidden = false;
            break;

        case 'Full Plate':
            document.getElementById('fullPlateItem').hidden = true;
            break;

        case "King's Plate":
            document.getElementById('clothArmorItem').hidden = true;
            document.getElementById('leatherArmorItem').hidden = true;
            document.getElementById('breastPlateItem').hidden = true;
            document.getElementById('fullPlateItem').hidden = true;
            break;
    }
}

// best case would be to actually create some weapon objects, but that aint this.
// Rusty Sword - +0 Damage
// Iron Sword - +3 Damage
// Steel Sword - +6 Damage
// Sharp Steel Sword - +9 Damage
// Imbued Sword - +12 Damage
// King's Sword - +15 Damage
function setWeapon(weapon)
{
    // update view
    var elements = document.getElementsByClassName("characterWeapon");
    for(var i = 0; i < elements.length; i++)
    {
        elements.item(i).innerHTML = weapon;
    }

    // update data
    playerData.weapon = weapon;

    switch(weapon)
    {
        case 'Rusty Sword':
            playerData.weaponBonus = 0;
            break;

        case 'Iron Sword':
            playerData.weaponBonus = 3;
            break;
        
        case 'Steel Sword':
            playerData.weaponBonus = 6;
            break;
        
        case 'Sharp Steel Sword':
            playerData.weaponBonus = 9;
            break;

        case 'Imbued Sword':
            playerData.weaponBonus = 12;
            break;

        case "King's Sword":
            playerData.weaponBonus = 15;
            break; 
    }

    updateStorePage();
}

// best case would be to actually create some armor objects, but that aint this.
// Tattered Cloth - 0 Armor
// Cloth - 1 Armor
// Leather - 2 Armor
// Breast Plate - 3 Armor
// Full Plate - 4 Armor
// King's Plate - 5 Armor
function setArmor(armor)
{
    // update view
    var elements = document.getElementsByClassName("characterArmor");
    for(var i = 0; i < elements.length; i++)
    {
        elements.item(i).innerHTML = armor;
    }

    // update data
    var originalArmor = playerData.armor;
    playerData.armor = armor;

    updateStorePage();

    var armorStat = 0;
    switch(armor)
    {
        case 'Tattered Cloth':
            playerData.armorReduction = 0;
            break;

        case 'Cloth Armor':
            armorStat = 1;
            playerData.armorReduction = 1;
            break;
        
        case 'Leather Armor':
            armorStat = 2;
            playerData.armorReduction = 2;
            break;
        
        case 'Breast Plate':
            armorStat = 4;
            playerData.armorReduction = 4;
            break;

        case 'Full Plate':
            armorStat = 6;
            playerData.armorReduction = 6;
            break;

        case "King's Plate":
            armorStat = 8;
            playerData.armorReduction = 8;
            break; 
    }
    if(playerData.skills['training'] == 1 && (!playerData.trainingApplied || originalArmor != playerData.armor) )
    {
        playerData.maxhealth += (10 * armorStat);
        var maxHealthElements = document.getElementsByClassName("characterMaxHealth");
        for(var i = 0; i < maxHealthElements.length; i++)
        {
            maxHealthElements.item(i).innerHTML = playerData.maxhealth;
        }
        playerData.trainingApplied = true;
        playerData.trainingAmount = (10 * armorStat);
    }
}

// Experience Levels as follows
// 50 * (level^2) - (50 * level)
// 1: start of game
// 2: 100
// 3: 300
// 4: 600...
function addExperience(number)
{
    // update view
    var elements = document.getElementsByClassName("characterXP");
    for(var i = 0; i < elements.length; i++)
    {
        elements.item(i).innerHTML = playerData.xp + number;
    }

    // update data
    playerData.xp += number;

    var xpForNextLevel = (50 * Math.pow((playerData.level+1),2) - (50 * (playerData.level+1)));
    while(playerData.xp >= xpForNextLevel)
    {
        addLevel();
        xpForNextLevel = (50 * Math.pow((playerData.level+1),2) - (50 * (playerData.level+1)))
    }
}

function addLevel()
{
    // update view
    var elements = document.getElementsByClassName("characterLevel");
    for(var i = 0; i < elements.length; i++)
    {
        elements.item(i).innerHTML = (playerData.level + 1);
    }

    // update data
    playerData.level += 1;
    if(playerData.level > 1)
    {
        setSkillPoints(playerData.skillPoints + 1);
        playerData.maxhealth += 10;
        setHealth(playerData.maxhealth);
        
    }
    else
    {
        playerData.maxhealth = 100;
        setHealth(playerData.maxhealth)
    }
    var maxHealthElements = document.getElementsByClassName("characterMaxHealth");
    for(var i = 0; i < maxHealthElements.length; i++)
    {
        maxHealthElements.item(i).innerHTML = playerData.maxhealth;
    }

    // update view for xp to next level
    var elements = document.getElementsByClassName("characterXPToNextLevel");
    for(var i = 0; i < elements.length; i++)
    {
        elements.item(i).innerHTML = (50 * Math.pow((playerData.level+1),2) - (50 * (playerData.level+1)));
    }
}

function setSkillPoints(value)
{
    // update view
    document.getElementById("skillPageSkillPoints").innerHTML = value;

    // update data
    playerData.skillPoints = value;
}

// add a skill. The value indicates the level of the skill. (Skill levels might be used later)
// some wonkyness with js dictionary deletes menas i prepop the skill dict and base it on value
function addToSkills(skill)
{
    let alreadyHasSkill = false;

    // update data
    for(let skillName in playerData.skills)
    {
        if(playerData.skills[skill] >= 1)
        {
            alreadyHasSkill = true;
        }
    }

    if(!alreadyHasSkill && (playerData.skillPoints >= 1)) // doesnt have skill, add it and remove skillpoint
    {
        playerData.skills[skill] = 1;
        setSkillPoints( (playerData.skillPoints - 1) )

        // update view
        document.getElementById(skill.toLowerCase() + "SkillBox").style.backgroundColor = "#0B5345";

        if(skill == "training")
        {
            setArmor(playerData.armor);
        }
    }
    else if( alreadyHasSkill && (skill.toLowerCase() != "haggle") ) // already has skill, so remove it and give back skillpoint
    {
        playerData.skills[skill] = 0;
        setSkillPoints( (playerData.skillPoints + 1) )

        if(skill.toLowerCase() == "training")
        {
            playerData.maxhealth -= playerData.trainingAmount;
            if(playerData.health > playerData.maxhealth)
            {
                setHealth(playerData.maxhealth);
            }

            var maxHealthElements = document.getElementsByClassName("characterMaxHealth");
            for(var i = 0; i < maxHealthElements.length; i++)
            {
                maxHealthElements.item(i).innerHTML = playerData.maxhealth;
            }
            playerData.trainingApplied = false;
            playerData.trainingAmount = 0;
        }

        // update view
        document.getElementById(skill.toLowerCase() + "SkillBox").style.backgroundColor = "#232A35";
    }
    updateStorePage();
}

// show/hide inventory items based on amount
function updateInventoryView()
{
    // update data and view
    for(let inventoryItem in playerData.inventory)
    {        
        if(playerData.inventory[inventoryItem] >= 1)
        {
            if(inventoryItem == 'healthPotion')
            {
                document.getElementById("combatHealthPotionButton").hidden = false;
            }
            if(inventoryItem == 'bomb')
            {
                document.getElementById("combatBombButton").hidden = false;
            }
            document.getElementById(inventoryItem + "Amount").innerHTML = playerData.inventory[inventoryItem];
            document.getElementById(inventoryItem + "Item").hidden = false;
        }
        else
        {
            if(inventoryItem == 'healthPotion')
            {
                document.getElementById("combatHealthPotionButton").hidden = true;
            }
            if(inventoryItem == 'bomb')
            {
                document.getElementById("combatBombButton").hidden = true;
            }
            document.getElementById(inventoryItem + "Amount").innerHTML = 0;
            document.getElementById(inventoryItem + "Item").hidden = true;
        }
    }
}

// add item to inventory. If it already exists, increment value by amount
// aquisition 0 = free, 1 = bought
function addToInventory(item,amount,aquisition)
{
    // update data
    if(aquisition == 0)
    {
        if(playerData.inventory[item])
        {
            playerData.inventory[item] += amount;
        }
        else
        {
            playerData.inventory[item] = amount;
        }
    }
    else
    {
        switch(item)
        {
            case 'healthPotion':
                if(playerData.gold >= gameData.healthPotionCost)
                {
                    setGold(playerData.gold -= gameData.healthPotionCost);
                    if(playerData.inventory[item])
                    {
                        playerData.inventory[item] += amount;
                    }
                    else
                    {
                        playerData.inventory[item] = amount;
                    }
                }
                break;

            case 'bomb':
                if(playerData.gold >= gameData.bombCost)
                {
                    setGold(playerData.gold -= gameData.bombCost);
                    if(playerData.inventory[item])
                    {
                        playerData.inventory[item] += amount;
                    }
                    else
                    {
                        playerData.inventory[item] = amount;
                    }
                }
                break;

            // item checks should help rpevent element editting in a webpage
            case 'ironSword':
                if(playerData.gold >= gameData.ironSwordCost && (playerData.weapon == "Rusty Sword") )
                {
                    setGold(playerData.gold -= gameData.ironSwordCost);
                    setWeapon("Iron Sword");
                }
                break;

            case 'steelSword':
                if(playerData.gold >= gameData.steelSwordCost && (playerData.weapon == "Iron Sword"))
                {
                    setGold(playerData.gold -= gameData.steelSwordCost);
                    setWeapon("Steel Sword");
                }
                break;

            case 'sharpSteelSword':
                if(playerData.gold >= gameData.sharpSteelSwordCost && (playerData.weapon == "Steel Sword"))
                {
                    setGold(playerData.gold -= gameData.sharpSteelSwordCost);
                    setWeapon("Sharp Steel Sword");
                }
                break;

            case 'imbuedSword':
                if(playerData.gold >= gameData.imbuedSwordCost && (playerData.weapon == "Sharp Steel Sword"))
                {
                    setGold(playerData.gold -= gameData.imbuedSwordCost);
                    setWeapon("Imbued Sword");
                }
                break;

            case 'clothArmor':
                if(playerData.gold >= gameData.clothArmorCost && (playerData.armor == "Tattered Cloth"))
                {
                    setGold(playerData.gold -= gameData.clothArmorCost);
                    setArmor("Cloth Armor");
                }
                break;

            case 'leatherArmor':
                if(playerData.gold >= gameData.leatherArmorCost && (playerData.armor == "Cloth Armor"))
                {
                    setGold(playerData.gold -= gameData.leatherArmorCost);
                    setArmor("Leather Armor");
                }
                break;

            case 'breastPlate':
                if(playerData.gold >= gameData.breastPlateCost && (playerData.armor == "Leather Armor"))
                {
                    setGold(playerData.gold -= gameData.breastPlateCost);
                    setArmor("Breast Plate");
                }
                break;

            case 'fullPlate':
                if(playerData.gold >= gameData.fullPlateCost && (playerData.armor == "Breast Plate"))
                {
                    setGold(playerData.gold -= gameData.fullPlateCost);
                    setArmor("Full Plate");
                }
                break;
        }
    }
    updateInventoryView()
}

function removeFromInventory(name,action)
{
    if(action == 'use')
    {
        switch(name)
        {
            case 'healthPotion':
                var healPercent = .25;
                if(playerData.skills['refinedTaste'] == 1)
                {
                    healPercent = .35;
                }
                var newHP = playerData.health + Math.ceil(playerData.maxhealth * healPercent);
                setHealth(newHP); // setHealth checks for overheal already
                playerData.inventory[name] -= 1;
                break;

            case 'bomb':
                playerData.inventory[name] -= 1;
                combatAttack(1);
                break;

            case 'kingsBlade':
            case 'kingsHilt':
                if( (playerData.inventory['kingsBlade'] >= 1) && (playerData.inventory['kingsHilt'] >= 1) && (gameData.currentLocation == "Roc Town") )
                {
                    setWeapon("King's Sword");
                    document.getElementById('kingsHilt' + "UseButton").hidden = true;
                    document.getElementById('kingsBlade' + "UseButton").hidden = true;
                    playerData.inventory['kingsHilt'] -= 1;
                    playerData.inventory['kingsBlade'] -= 1;
                }
                break;

            case 'kingsBarding':
            case 'kingsPlateMetal':
                if( (playerData.inventory['kingsBarding'] >= 1) && (playerData.inventory['kingsPlateMetal'] >= 1) && (gameData.currentLocation == "Roc Town") )
                {
                    setArmor("King's Plate");
                    document.getElementById('kingsBarding' + "UseButton").hidden = true;
                    document.getElementById('kingsPlateMetal' + "UseButton").hidden = true;
                    playerData.inventory['kingsBarding'] -= 1;
                    playerData.inventory['kingsPlateMetal'] -= 1;
                }
                break;
        }
        updateInventoryView()
    }
    else if(action == 'sell' && (gameData.currentLocation == "Roc Town"))
    {
        switch(name)
        {
            case 'healthPotion':
                setGold(playerData.gold += 25);
                break;

            case 'bomb':
                setGold(playerData.gold += 50);
                break;

            case 'kingsBlade':
                setGold(playerData.gold += 250);
                break;

            case 'kingsHilt':
                setGold(playerData.gold += 250);
                break;

            case 'kingsBarding':
                setGold(playerData.gold += 250);
                break;

            case 'kingsPlateMetal':
                setGold(playerData.gold += 250);
                break;
        }
        playerData.inventory[name] -= 1;
        updateInventoryView()
    }
}

// increment kill counter. might be useful later
function addToKills()
{
    // update view

    // update data
    playerData.kills += 1;
}

// change character location
function setLocation(location)
{
    // update view
    document.getElementById("sidenavMapName").innerHTML = location;

    // update data
    gameData.currentLocation = location;
}

// ------------------ INIT ---------------------
// start menu start button pressed
// if the user doesnt follow the 1 requirement of no commas we give them the name IdiotWithNoName (also if they dont type anything)
function startButtonPressed()
{
    //let centerPage = new CenterPageObj();

    // centerPageTitle
    //centerPage.title = document.getElementById(centerPage.titleName);

    // NAME
    var userInputName = document.getElementById('startMainMenuName').value;
    if(userInputName && !userInputName.includes(','))
    {
        var playerName = document.getElementById('startMainMenuName').value;
        setName(playerName)
    }
    else
    {
        var playerName = "IdiotWithNoName"
        setName(playerName)
    }

    // HEALTH
    //setHealth(90);

    // GOLD
    setGold(100);

    // WEAPON
    setWeapon("Rusty Sword");

    // ARMOR
    setArmor("Tattered Cloth");

    // INVENTORY
    addToInventory("healthPotion",2,0);

    // EXPERIENCE
    addExperience(0);

    // LEVEL
    //addLevel();

    // KILLS
    playerData.totalKills = 0;

    // --- GAME DATA ---
    // LOCATION
    setLocation("Roc Town");

    // Expose sidenav options
    setMostSideNavToVisible();

    // landing page after start
    loadMapSheet();

    updateInventoryView();
}