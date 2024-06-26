import { Typography } from '@mui/material';
import './EmptyStub.scss';

const EmptyStub = () => (
  <div className="emptyRootStub">
    <svg height="200px" width="200px" viewBox="0 0 177.218 177.218">
      <g>
        <g>
          <polygon
            style={{ fill: '#010002' }}
            points="88.008,68.431 120.493,95.945 123.685,93.247 91.196,65.736 122.866,38.913 
            123.685,38.219 120.493,35.524 88.008,63.038 55.522,35.524 52.334,38.219 84.829,65.736 53.153,92.56 52.334,93.247 
            55.522,95.945"
          />
          <path
            style={{ fill: '#010002' }}
            d="M164.77,5.819l-0.086-0.812H12.526L0.1,119.609L0,120.614h0.319v51.596h176.566v-51.596h0.333
            L164.77,5.819z M17.722,10.797h141.765l11.281,104.026h-48.014v2.895c0,18.828-15.317,34.149-34.149,34.149
            c-18.835,0-34.153-15.321-34.153-34.149v-2.895H6.442L17.722,10.797z M171.094,166.427H6.109v-45.813h42.656
            c1.492,20.804,18.9,37.041,39.84,37.041c20.936,0,38.34-16.234,39.825-37.041h42.66v45.813H171.094z"
          />
        </g>
      </g>
    </svg>
    <Typography variant="body1" className="emptyRootStubDescription">
      Your project list is empty. Create a new project.
    </Typography>
  </div>
);

export default EmptyStub;
