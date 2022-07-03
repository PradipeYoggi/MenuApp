
// defines the different types of menus available
const MenuTypes = {
    Breakfast: 1,
    Lunch: 2,
    Dinner: 3
}

//The Menu class defines the menu for a restaurant chain's locations.
class Menu {
    constructor(name, type, location) {
        this.name = name;
        this.type = type;
        this.location = location;
        this.dishes = [];
    }

    // adds a dish to the menu
    addDish(dish) {
        if (dish instanceof Dish) {
            this.dishes.push(dish);
        } else {
            throw new Error(`You cannot add this ${dish} to the menu. Incorrect type.`);
        }
    }

    // remove a dish from the menu
    removeDish(index) {
        if (index >= 0 && index < this.dishes.length) {
            this.dishes.splice(index,1);
            return true;
        }
        return false;
    }

    // returns a textual rendering of the menu for use by the caller
    describe() {
        let menu = `${this.getType(this.type)} menu for ${this.location} named ${this.name}\n\n`;
        for (let i=0;i < this.dishes.length; i++) {
            menu += `${this.dishes[i].describe()}\n`;
        }
        return menu;
    }

    getType(type) {
        let typeAsString = '';
        switch(parseInt(type)) {
            case MenuTypes.Breakfast:
                typeAsString = 'Breakfast';
                break;
            case MenuTypes.Lunch:
                typeAsString = 'Lunch';
                break;
            case MenuTypes.Dinner:
                typeAsString = 'Dinner';
                break;
        }
        return typeAsString;
    }
}

//The Dish class defines a dish that can go on the restaurant chain's location's menu.
class Dish {
    constructor(name, price, description) {
        this.name = name;
        this.price = price;
        this.description = description;
    }

    // returns a textual rendering of the dish for use by the caller
    describe() {
        let dish = `${this.name}        $${this.price}
        ${this.description}`;
        return dish;
    }
}

// class that manages the presentation of the menus, editing/deleting of the menus 
// and dishes for our restaurant chain
class RestaurantMenuManager {
    constructor() {
        this.dishes = [];
        this.menus = [];
        this.selectedMenu = null;
   }

   ShowMenuOptions() {
       return prompt(`
       0) exit
       1) create dish
       2) display all dishes
       3) remove a dish
       4) create new menu
       5) view menu
       6) remove menu
       7) display all menus`);
   }

   start() {
       let selection = this.ShowMenuOptions();
       while (selection != 0) {
           switch(selection) {
               case '1':
                   this.createDish();
                   break;
                case '2':
                    this.displayAllDishes();
                    break;
                case '3':
                    this.removeADish();
                    break;
               case '4':
                   this.createNewMenu();
                   break;
                case '5':
                    this.viewMenu();
                    break;
                case '6':
                    this.removeMenu();
                    break;
                case '7':
                    this.displayAllMenus();
                    break;
           }
           if (selection != 0) {
               selection = this.ShowMenuOptions();
           } 
       }
       alert('Goodbye!');
   }

   // create a dish
   createDish() {
       let name = prompt(`Enter new Dish's name:`);
       let price = prompt(`Enter new Dish's price:`);
       let description = prompt(`Enter new Dish's description`);

       let dish = new Dish(name, price, description);
       this.dishes.push(dish);
   }

   // display all dishes
   displayAllDishes() {
       let dishes = '';
       for (let i=0; i < this.dishes.length; i++) {
           dishes += `${i}) ${this.dishes[i].describe()} \n`;
       }
       if (this.dishes.length === 0) {
        alert('No dishes defined.');
       } else {
        alert(dishes);
       }
   }

   removeADish() {
       let index = prompt(`Enter the index of the dish you wish to remove:`);
       if (index >= 0 && index < this.dishes.length) {
           this.dishes.splice(index, 1);
       }
   }

   // creates a new menu
   createNewMenu() {
       let name = prompt(`Enter new Menu's name:`);
       let type = prompt(`Enter new Menu's type (1 = breakfast,2 = lunch,3 = dinner):`);
       let location = prompt(`Enter location to which this menu applies:`);

       let menu = new Menu(name, type, location);
       this.menus.push(menu);
    
       prompt(`Now choose a dish to add to this menu`);
       this.displayAllDishes();
       let dishToAdd = prompt('Enter the dish number to add');

       if (dishToAdd >=0 && dishToAdd < this.dishes.length) {
           this.menus[this.menus.length-1].addDish(this.dishes[dishToAdd]);
       } 
       else {
           alert(`Invalid dish selected`);
       }
   }

    // create a new menu
    createNewMenu() {
        // get all menu info from user
        let name = prompt(`Enter new Menu's name:`);
        let type = prompt(`Enter new Menu's type (1 = breakfast,2 = lunch,3 = dinner):`);
        let location = prompt(`Enter location to which this menu applies:`);

        // create a new menu and add it to the array
        let menu = new Menu(name, type, location);
        this.menus.push(menu);

        this.presentDishesToAddtoMenu(this.menus.length-1);
    }

    // view a menu
    viewMenu() {
        let index = prompt(`Enter index of menu to view:`);

        if (index >=0 && index < this.menus.length) { 
            alert(this.menus[index].describe());

            let answer = prompt(`Would you like to add a dish to this menu? (Y/N)`);
            if (answer === 'Y' || answer === 'y') {
                this.presentDishesToAddtoMenu(index);
            }
        }
        else {
            alert(`Invalid menu selected`);
        }
    }

    // presents the list of dishes we have and lets the user
    // add a dish to the menu that is specified as the argument
    presentDishesToAddtoMenu(menuIndex) {
        let answer = 'y';
        do {
            alert(`Now look over the dishes to add one to this menu`);
            this.displayAllDishes();
            let dishToAdd = prompt('Enter the dish number to add');
    
            if (dishToAdd >=0 && dishToAdd < this.dishes.length) {
                this.menus[menuIndex].addDish(this.dishes[dishToAdd]);
            } 
            else {
                alert(`Invalid dish selected`);
            }
            answer = prompt('Add more dishes? (Y/N)');

        } while (answer === 'Y' || answer === 'y')
    }

    //removes a menu that is specified by the user
    removeMenu() {
        let menuToRemove = prompt(`Enter the index of the menu to remove`);
        if (menuToRemove >=0 && menuToRemove < this.menus.length) {
            this.menus.splice(menuToRemove,1);
        }
        else {
            alert(`Invalid menu selected`);
        }
    }

    //displays all the menus defined in the system
    displayAllMenus() {
        let menus = '';
        for (let i=0; i < this.menus.length; i++) {
            menus += this.menus[i].describe() + '\n';
        }
        if (this.menus.length === 0) {
            alert('No menus defined.');
        } else {
            alert(menus);
        }
    }
}

let menuManager = new RestaurantMenuManager();
menuManager.start();