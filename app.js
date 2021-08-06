// made by Aaron Starr
// js is a headache with variable typing it seems

'use strict';

// global var for player data
const playerData = {
    name:"",
    health:0,
    gold:0,
    level:0,
    xp:0,
    weapon:"",
    armor:"",
    inventory:{},
    skills:{},
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
    obj.playerNameId = 'sidenavCharacterName'

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

function sidenavRowClick(rowNum) 
{

    let centerPage = new CenterPageObj();

    // centerPageTitle
    centerPage.title = document.getElementById(centerPage.titleName);

    switch(rowNum)
    {
        case 0: // Character
            loadMapSheet(centerPage);
            break;

        case 1: // Character
            loadCharacterSheet(centerPage);
            break;
        
        case 2: // Inventory
            loadInventorySheet(centerPage);
            break;
            
        case 3: // Skills
            loadSkillsSheet(centerPage);
            break;
            
        case 4: // Store
            loadStoreSheet(centerPage);
            break;

        case 5: // Save
            loadSave(centerPage);
            break;

        case 6: // Load
            loadLoad(centerPage);
            break;

        case 7: // Credits
            loadCreditsSheet(centerPage);
            break;
    }
}

// hide all center page setups
function setAllCenterPagesToHidden(centerPage)
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
function setMostSideNavToHidden(centerPage)
{
    document.getElementById(centerPage.sidenavMapName).hidden = true;
    document.getElementById(centerPage.sidenavCharacterName).hidden = true;
    document.getElementById(centerPage.sidenavInventoryName).hidden = true;
    document.getElementById(centerPage.sidenavSkillName).hidden = true;
    document.getElementById(centerPage.sidenavStoreName).hidden = true;
    document.getElementById(centerPage.sidenavCreditsName).hidden = true;
}

// Show most sidenav buttons (exclusions apply; such as Save, Load and Credits which are always visible)
function setMostSideNavToVisible(centerPage)
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
function loadMapSheet(centerPage)
{
    document.getElementById(centerPage.titleName).innerHTML = "Map";

    setAllCenterPagesToHidden(centerPage);
    document.getElementById(centerPage.mapPageName).hidden = false;
}

// expose the center page with the character html
function loadCharacterSheet(centerPage)
{
    document.getElementById(centerPage.titleName).innerHTML = "Character";

    setAllCenterPagesToHidden(centerPage);
    document.getElementById(centerPage.characterPageName).hidden = false;
}

// load the center page with the inventory html
function loadInventorySheet(centerPage)
{
    document.getElementById(centerPage.titleName).innerHTML = "Inventory";

    setAllCenterPagesToHidden(centerPage);
    document.getElementById(centerPage.inventoryPageName).hidden = false;
}

// load the center page with the skills html
function loadSkillsSheet(centerPage)
{
    document.getElementById(centerPage.titleName).innerHTML = "Skills";

    setAllCenterPagesToHidden(centerPage);
    document.getElementById(centerPage.skillPageName).hidden = false;
}

// load the center page with the store html
function loadStoreSheet(centerPage)
{
    document.getElementById(centerPage.titleName).innerHTML = "Store";

    setAllCenterPagesToHidden(centerPage);
    document.getElementById(centerPage.storePageName).hidden = false;
}

// load, save system
function loadSave(centerPage)
{
    setMostSideNavToHidden(centerPage);
}

// load, load file system
function loadLoad(centerPage)
{
    setMostSideNavToVisible(centerPage);
}

// load the center page with the credits html
function loadCreditsSheet(centerPage)
{
    document.getElementById(centerPage.titleName).innerHTML = "Credits";

    setAllCenterPagesToHidden(centerPage);
    document.getElementById(centerPage.creditsPageName).hidden = false;
}


// ----------------- SETTERS --------------------


function setName(centerPage,name)
{
    // update view
    document.getElementById(centerPage.playerNameId).innerHTML = name;

    // update data
    playerData.name = name;
}


function setHealth(centerPage,newHealth)
{
    // player death
    if(newHealth <= 0)
    {
        // update view
        document.getElementById("sidenavHealth").innerHTML = "0 HP";

        // update data
        playerData.health = 0;
    }
    else
    {
        // update view
        document.getElementById("sidenavHealth").innerHTML = newHealth + " HP";

        // update data
        playerData.health = newHealth;
    }
}

function setGold(centerPage,newGold)
{
    // update view
    document.getElementById("sidenavGold").innerHTML = newGold + " GP";

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
function setWeapon(centerPage,weapon)
{
    // update view

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
function setArmor(centerPage,armor)
{
    // update view

    // update data
    playerData.armor = armor;
}

// add item to inventory. If it already exists, increment value by amount
function addToInventory(centerPage,item,amount)
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

// add a skill. The value indicates the level of the skill. (Skill levels might be used later)
function addToSkills(centerPage,skill)
{
    // update view

    // update data
    if(playerData.skills[skill])
    {
        playerData.skills[skill] = playerData.skills[skill] + 1;
    }
    else
    {
        playerData.skills[skill] = 1;
    }
}

// increment kill counter. might be useful later
function addToKills(centerPage)
{
    // update view

    // update data
    playerData.kills += 1;
}

// change character location
function setLocation(centerPage,location)
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
function setTownStage(centerPage,stage)
{
    // update view

    // update data
    gameData.townStage = stage;
}

// set Dungeon stage
// 1 = dungeon 1 unlocked
// 2 = dungeon 2 unlocked
// 3 = dungeon 3 unlocked
function setDungeonStage(centerPage,stage)
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
    let centerPage = new CenterPageObj();

    // centerPageTitle
    centerPage.title = document.getElementById(centerPage.titleName);

    // NAME
    var userInputName = document.getElementById('startMainMenuName').value;
    if(userInputName && !userInputName.includes(','))
    {
        var playerName = document.getElementById('startMainMenuName').value;
        setName(centerPage,playerName)
    }
    else
    {
        var playerName = "IdiotWithNoName"
        setName(centerPage,playerName)
    }

    // HEALTH
    setHealth(centerPage,100);

    // GOLD
    setGold(centerPage,50);

    // WEAPON
    setWeapon(centerPage,"Rusty Sword");

    // ARMOR
    setArmor(centerPage,"Tattered Cloth");

    // INVENTORY
    addToInventory(centerPage,"Health Potion",2);
    addToInventory(centerPage,"Inactive Bomb",1);

    // SKILLS
    addToSkills(centerPage,"Rend");

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
    setMostSideNavToVisible(centerPage);

    // landing page after start
    loadMapSheet(centerPage);
}