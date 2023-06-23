let storeForm = document.querySelector('.store__open-times__form__inactive');

let analysisPage = domGen(`
<div #analysis-container .store__details__container>
    <div .analysis__inner-bar>Sales Summary
    </div>
    <div .analysis__inner-dropdown>
        <div .analysis__inner-content>
        <input .analysis__inner-content-input type="text">
        </input>
        <button .analysis__inner-content-button>
        </button>
        </div>
    </div>
    <div .analysis__inner-bar>Hourly Sales
    </div>
    <div .analysis__inner-dropdown>
        <div .analysis__inner-content>
        <input .analysis__inner-content-input type="text">
        </input>
        <button .analysis__inner-content-button>
        </button>
        </div>
    </div>
</div>
`)

storeForm.appendChild(analysisPage);