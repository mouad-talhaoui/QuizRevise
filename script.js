
// =====================================================================================================================
//                                                                                                   RESOURCES INSERTER
// =====================================================================================================================

// ---------------------------------------------------------------------------------------------------------------------
//                                                                                               CONFIGURATION DE BASE
// ---------------------------------------------------------------------------------------------------------------------

/**
 * @typedef {Object} Resource
 * @property {string} title - The title of the resource.
 * @property {string} link - The URL of the resource.
 */

/**
 * An array of resource objects to be displayed on the page.
 * @type {Resource[]}
 */
const resources = [
    {
        title: "INPT Ressources",
        link: "https://drive.google.com/drive/folders/1N47xVtTOCrZABlqEFT7V3lAsPq9yLiQK?usp=drive_link"
    },
    {
        title: "ENSET Ressources",
        link: "https://drive.google.com/drive/folders/1eGHv7dk0t78Y5Uo6HK1K0SJZ8cMpPGA5?usp=drive_link"
    },
    {
        title: "BAC+2 Ressources",
        link: "https://drive.google.com/drive/folders/0B6myi2jo94YuSGNTNE9wN0FjVTQ?resourcekey=0-MFWuNEsHMkgJv_y-BxC7AQ&usp=drive_link"
    },
    {
        title: "OTHER Ressources",
        link: "https://drive.google.com/drive/folders/1SOv15eGJ0I_k7cRjDGqkNXCmQ-VqR9kz?usp=drive_link"
    }
    ,
    {
        title: "Livres Ressources",
        link: "https://drive.google.com/drive/folders/1tupfOQUq7opePd0Xq_LGmnj_xtwILRnk?usp=drive_link"
    }

];

// ---------------------------------------------------------------------------------------------------------------------
//                                                                                                   MANIPULATION DU DOM
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Creates and injects resource elements into the DOM.
 * 
 * This function finds a container element by its ID and populates it with
 * styled links based on the `resources` array. If the container isn't found,
 * it does nothing, ensuring it only runs on the correct page.
 */
const displayResources = () => {
    const resourcesContainer = document.getElementById('resources-container');

    // Exit if the container element doesn't exist
    if (!resourcesContainer) {
        return;
    }

    // Generate the HTML for each resource
    const resourcesHTML = resources.map(resource => `
        <a href="${resource.link}" target="_blank" class="block bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <h3 class="text-xl font-semibold text-gray-800">${resource.title}</h3>
        </a>
    `).join('');

    // Inject the generated HTML into the container
    resourcesContainer.innerHTML = resourcesHTML;
};

// ---------------------------------------------------------------------------------------------------------------------
//                                                                                                   INITIALISATION
// ---------------------------------------------------------------------------------------------------------------------

// Add an event listener to run the displayResources function when the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', displayResources);
