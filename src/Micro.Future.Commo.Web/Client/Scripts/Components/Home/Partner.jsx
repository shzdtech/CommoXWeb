import Chart from 'chart.js';
import React from 'react';
import { push } from 'react-router-redux';
import { Link} from 'react-router';
import Tab from '../Common/Tab';

class Partner extends React.Component {
    constructor() {
        super();
    }

    render() {
        var image1 = require('../../../Content/images/partners/bank_img01.jpg');
        var image2 = require('../../../Content/images/partners/bank_img02.jpg');
        var image3 = require('../../../Content/images/partners/bank_img03.jpg');
        var image4 = require('../../../Content/images/partners/bank_img04.jpg');
        var image13 = require('../../../Content/images/partners/bank_img013.jpg');
        var image6 = require('../../../Content/images/partners/bank_img06.jpg');
        var image7 = require('../../../Content/images/partners/bank_img07.jpg');
        var image8 = require('../../../Content/images/partners/bank_img08.jpg');
        var image9 = require('../../../Content/images/partners/bank_img09.jpg');
        var image10 = require('../../../Content/images/partners/bank_img010.jpg');
        var image11 = require('../../../Content/images/partners/bank_img011.jpg');
        var image12 = require('../../../Content/images/partners/bank_img012.jpg');

        return <div className='partner-tab'>
            <div className="part-info container">
                <h1>合作伙伴</h1>
                <div className="part_list">
                    <ul>
                        <li><img src={image1} />
                        </li>
                        <li><img src={image2}/>
                        </li>
                        <li><img src={image3} />
                        </li>
                        <li><img src={image4}/>
                        </li>
                        <li><img src={image6} />
                        </li>
                        <li><img src={image7}  />
                        </li>
                        <li><img src={image10} />
                        </li>
                        <li><img src={image9} />
                        </li>
                        <li><img src={image8}  />
                        </li>
                        <li><img src={image13}/>
                        </li>
                        <li><img src={image11} />
                        </li>
                        <li><img src={image12} />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    }
}

module.exports = Partner;