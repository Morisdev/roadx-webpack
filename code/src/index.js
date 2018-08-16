// entry

import { cube } from './util';

const app = () => {
    let el = document.createElement('div');
    el.innerHTML = '5 x 25  = ' + cube(5);
    return el;
}

document.body.appendChild(app());