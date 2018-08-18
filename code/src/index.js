// entry

import { cube } from './util';
import { print } from './print';
import './style.css';

const app = () => {
    let el = document.createElement('div');
    el.innerHTML = '5 x 25  = ' + cube(5);
    return el;
}

document.body.appendChild(app());

if (module.hot) {
    module.hot.accept('./print.js', function() {
        console.log('updated from HMR');
        print();
    });
}