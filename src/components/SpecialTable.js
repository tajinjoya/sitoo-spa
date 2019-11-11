import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTable = styled.table`
  width: inherit;
  color: white;
  text-align: center;
  margin: 0 auto;

  
`;

const StyledThead = styled.thead`
  background: #333; 
  font-size: 16px;
  @media only screen and (min-width: 768px) {
    font-size: 20px;
  }
  @media screen and (max-width: 425px) {
    font-size: 12px;
  }
`;

const StyledTbody = styled.tbody`
  tr {
    color: black;
    &:nth-child(even) {
      background-color: #a77efd4f;
    }
  }
`;

const StyledTr = styled.tr`
  background-color: #a77efd1f;
`;

const StyledTh = styled.th`
  padding: 15px;
  border-right: 2px solid #8951ff36;
  &:last-child {
    border-right: none;
  }
  @media only screen and (min-width: 768px) {
    padding: 20px;
  }
  @media screen and (max-width: 425px) {
    padding: 5px;
  }
`;

const StyledTd = styled.td`
  padding: 15px;
  font-size: 14px;
  border-right: 2px solid #90909029;
  &:last-child {
    border-right: none;
  }
  @media only screen and (min-width: 768px) {
    padding: 20px;
    font-size: 16px;
  }
  @media screen and (max-width: 425px) {
    padding: 10px;
    font-size: 12px;
  }
`;

const SpecialTable = ({ data }) => (
  <StyledTable>
    <StyledThead>
      <StyledTr>
        {data.headings
          .map((heading) => <StyledTh key={data.headings.indexOf(heading)} scope="col">{heading}</StyledTh>)}
      </StyledTr>
    </StyledThead>
    <StyledTbody>
      {data.values
        .map((row) => (
          <StyledTr key={data.values.indexOf(row)}>
            {row.map((value) => <StyledTd key={row.indexOf(value)}>{value}</StyledTd>)}
          </StyledTr>
        ))}
    </StyledTbody>
  </StyledTable>

);

SpecialTable.defaultProps = {
  data: {
    headings: ['Placeholder heading'],
    values: [['Placeholder value']],
  },
};

SpecialTable.propTypes = {
  data: PropTypes.shape({
    headings: PropTypes.arrayOf(PropTypes.string),
    values: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]))),
  }),
};

export default SpecialTable;
