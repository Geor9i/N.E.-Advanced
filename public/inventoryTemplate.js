let inventoryTemplateForm = document.querySelector('.inventory-template__create-form__inactive');
let addInventoryButton = document.getElementById('inventory-add-record-button');
let inventoryMainContainer = document.querySelector('.inventory__main-container');

addInventoryButton.addEventListener('click', inventoryRecordTemplate);


async function inventoryRecordTemplate () {

      let createInventoryForm = domGen(`
        <div .page-cover>
          <div .inventory-form__container>
            <form .inventory-form>
            <label for="inventory-process-textarea">Inventory Report Processor</label>
            <textarea name="inventory-process-textarea" .inventory-process-textarea placeholder="Paste inventory report here!"></textarea>
            <div .inventory-content-groups__container>
              <h3 .inventory-content--categories-title>Discovered Groups</h3>
              <ul .inventory-content-box>
                <li>Ambient Packaging</li>
                <li>Frozen Product</li>
              </ul>
              <ul .inventory-content-box>
                <li>Report Span: 200 days</li>
                <li>Start Date: 01/01/2023</li>
                <li>End Date: 06/06/2023</li>
              </ul>
            <button .inventory-process-btn >Process</button>
            </form>
              </div>
            </div>
          </div>
        </div>
        `) 
      inventoryMainContainer.insertBefore(createInventoryForm, inventoryMainContainer.firstChild);

  //Check if inventory report is valid
  let textArea = document.querySelector('.inventory-process-textarea');

  textArea.addEventListener('input', (e) => {
    let reportProcessor = inventoryHarvest (textArea.value);
    console.log(reportProcessor);
  })
  let form = document.querySelector('.inventory-form');
  form.addEventListener('submit', (e)=> {
   e.preventDefault();
    createInventoryForm.remove();
   
 }) 
}