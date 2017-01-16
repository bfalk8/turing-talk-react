import React from 'react';
import ReactDOM from 'react-dom';
import TuringTalk from 'components/TuringTalk';

import './main.scss';

ReactDOM.render(
    <TuringTalk messages={["How are you?", "Good", "ok bye"]} />,
    document.getElementById('app')
);
