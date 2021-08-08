// made by Aaron Starr
// Copyright, Aaron Starr. All rights reserved. Redistribution and use of this content including art, with or without modification, is prohibited. Except as represented in this agreement, all work product by Aaron Starr is provided "as-is". Other than as provided in this agreement, Aaron Starr makes no other warranties, express or implied, and hereby disclaims all implied warranties. Requests for; amendments, warranties, copyright information, questions, or permissions, please contact aaronstarrdev@gmail.com

'use strict';

// global var for player data
const playerData = {
    name:"",
    maxhealth:100, // increased through function addLevel()
    health:0,
    gold:0,
    level:0,
    xp:0,
    weapon:"",
    armor:"",
    inventory:{},
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
    totalKills:0
};

// global var for game data
const gameData = {
    currentLocation:"",
    townStage:0,
    dungeonStage:0
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

    obj.sidenavMapName = 'sidenavMapRow';
    obj.sidenavCreditsName = 'sidenavCreditsRow';
    obj.sidenavCharacterName = 'sidenavCharacterRow';
    obj.sidenavInventoryName = 'sidenavInventoryRow';
    obj.sidenavSkillName = 'sidenavSkillRow';
    obj.sidenavStoreName = 'sidenavStoreRow';
    obj.sidenavSaveName = 'sidenavSaveRow';
    obj.sidenavLoadName = 'sidenavLoadRow';

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
        case 0: // Character
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

// Show most sidenav buttons (exclusions apply; such as Save, Load and Credits which are always visible)
function setMostSideNavToVisible()
{
    document.getElementById(centerPage.sidenavMapName).hidden = false;
    document.getElementById(centerPage.sidenavCharacterName).hidden = false;
    document.getElementById(centerPage.sidenavInventoryName).hidden = false;
    document.getElementById(centerPage.sidenavSkillName).hidden = false;
    document.getElementById(centerPage.sidenavStoreName).hidden = false;
    document.getElementById(centerPage.sidenavSaveName).hidden = false;
    document.getElementById(centerPage.sidenavCreditsName).hidden = false;
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
    setMostSideNavToHidden(centerPage);
}

// load, load file system
function loadLoad()
{
    setMostSideNavToVisible(centerPage);
}

// load the center page with the credits html
function loadCreditsSheet()
{
    document.getElementById(centerPage.titleName).innerHTML = "Credits";

    setAllCenterPagesToHidden(centerPage);
    document.getElementById(centerPage.creditsPageName).hidden = false;
}


// ----------------- SETTERS --------------------


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
    console.log(elements);
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
    playerData.armor = armor;
}

// add item to inventory. If it already exists, increment value by amount
function addToInventory(item,amount)
{
    // update view

    // update data
    if(playerData.inventory[item])
    {
        playerData.inventory[item] = playerData.inventory[item] + amount;
    }
    else
    {
        playerData.inventory[item] = amount;
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
    }
    else if( alreadyHasSkill && (skill.toLowerCase() != "haggle") ) // already has skill, so remove it and give back skillpoint
    {
        playerData.skills[skill] = 0;
        setSkillPoints( (playerData.skillPoints + 1) )

        // update view
        document.getElementById(skill.toLowerCase() + "SkillBox").style.backgroundColor = "#232A35";
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
    gameData.location = location;
}

// set town stage, or the level fo the town
// 0 = decrepit, falling apart, missing buildings and people. Seer is present for beginning story. Dungeon 1 unlocked
// 1 = carpenter comes, builds his store/house. can be used for thematically building others' stores/houses. Also unlocks dungeon 2
// 2 = blacksmith comes, can upgrade armor and weapons, Also unlocks dungeon 3
// 3 = Arena Master comes, player can fight by betting money and winning.
function setTownStage(stage)
{
    // update view

    // update data
    gameData.townStage = stage;
}

// set Dungeon stage
// 1 = dungeon 1 unlocked
// 2 = dungeon 2 unlocked
// 3 = dungeon 3 unlocked
function setDungeonStage(stage)
{
    // update view

    // update data
    gameData.dungeonStage = stage;
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
    setGold(50);

    // WEAPON
    setWeapon("Rusty Sword");

    // ARMOR
    setArmor("Tattered Cloth");

    // INVENTORY
    addToInventory("Health Potion",2);
    addToInventory("Inactive Bomb",1);

    // EXPERIENCE
    addExperience(305);

    // LEVEL
    //addLevel();

    // KILLS
    playerData.totalKills = 0;

    // --- GAME DATA ---
    // LOCATION
    setLocation("Roc Town");

    // TOWN STAGE (LEVEL)
    setTownStage(0);

    // DUNGEON STAGE (UNLOCKS)
    setDungeonStage(0);

    // Expose sidenav options
    setMostSideNavToVisible();

    // landing page after start
    loadMapSheet();
}