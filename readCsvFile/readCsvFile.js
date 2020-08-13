import { LightningElement, track, api } from 'lwc';

export default class readCsvFile extends LightningElement {
    readFiles() {
        [...this.template
            .querySelector('input[type="file"]')
            .files].forEach(async file => {
                try {
                    const result = await this.load(file);
                    // Process the CSV here
                    console.log(result);
                } catch(e) {
                    // handle file load exception
                }
            });
    }
    async load(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function() {
                resolve(reader.result);
            };
            reader.onerror = function() {
                reject(reader.error);
            };
            reader.readAsText(file);
        });
    }
}
