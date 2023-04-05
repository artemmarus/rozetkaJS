


## For run tests do this

1. run `npm install` to install dependencies

2. run `npx playwright test` to run tests# testWork


## Test cases:
Summary: “Verify if the price filter working correctly for the following marketplaces”
1. Open marketplace url. Verify it.
2. Open category and subcategory if it is necessary.
3. Navigate to the filters section, for the following marketplaces it is located on the left side. Apply 2-3 filters.
4. Verify that all the items on the page are sorted correctly by the "from" and "to" price filters you entered.

Summary: “Add items to the basket”
1. Open marketplace url. Verify it.
2. Open category and subcategory if it is necessary.
3. Add any item to the basket.
4. Select another category and add an item from that category.
5. Verify information of items inside the basket.
6. Verify that the price is calculated correctly.
7. Verify that the delete item button is clickable.

Summary: “Search the item”
1. Open marketplace url. Verify it.
2. Search random item by name.
3. Verify that all items are correctly displayed according to your searching request (only on the first page).

Summary: ”Try to login in account”
1. Open marketplace url. Verify it 
2. Open user account page.
3. Login in account 
Fail: checkbox "You need to confirm that you are not a robot" 

