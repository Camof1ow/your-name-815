// public/script.js
import Choices from 'choices.js';
import * as d3 from 'd3';

const inputLastName = document.getElementById('last-name-input');
const inputFirstName = document.getElementById('first-name-input');
const selectLastName = document.getElementById('last-name-select');
const selectFirstName = document.getElementById('first-name-select');

async function loadHanjaData() {
    try {
        const data = await d3.csv('/hanja.csv');
        return data.map(d => ({
            value: d.hanja,
            label: `${d.hanja} (${d.meaning.replace(/[\[\]\'\"]/g, '')})`
        }));
    } catch (error) {
        console.error('Error loading CSV data:', error);
    }
}

function initChoices() {
    loadHanjaData().then(allHanja => {
        const lastNameChoices = new Choices(selectLastName, {
            searchEnabled: true,
            itemSelectText: '',
            shouldSort: false,
        });

        const firstNameChoices = new Choices(selectFirstName, {
            searchEnabled: true,
            itemSelectText: '',
            shouldSort: false,
        });

        inputLastName.addEventListener('input', () => {
            const query = inputLastName.value.trim();
            const filteredHanja = allHanja.filter(item =>
                item.label.includes(query) || item.value.includes(query)
            );
            lastNameChoices.clearStore();
            lastNameChoices.setChoices(filteredHanja, 'value', 'label', true);
        });

        inputFirstName.addEventListener('input', () => {
            const query = inputFirstName.value.trim();
            const filteredHanja = allHanja.filter(item =>
                item.label.includes(query) || item.value.includes(query)
            );
            firstNameChoices.clearStore();
            firstNameChoices.setChoices(filteredHanja, 'value', 'label', true);
        });
    });
}

initChoices();
