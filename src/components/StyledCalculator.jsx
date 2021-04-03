import styled from "styled-components"

export const Wrapper = styled.div`
    width: 400px;
    height: 600px;
    background: #cee2f3;
    border: 0.5px solid black;
    padding: 25px;
`;
export const AnswerBlock = styled.div`
    height: calc(100% / 5);
    width: 100%;
    background: white;
    border: 0.5px solid black;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    color: black;
`;
export const GetNumbers = styled.div`
    width: calc(100% / 2);
    height: 40px;
    text-align: center;
    padding-top: 10px;
`;
export const Answer = styled.div`
    width: calc(100% / 2);
    height: 40px;
    padding-top: 10px;
    text-align: right;
    padding-right: 15px;
`;

export const FLexContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`;
export const RowBlock = styled.div`
    display: grid;
    grid-template-columns: repeat(4, calc(((400px / 4) - 21px)));
    margin-top: 25px;
    grid-column-gap: 10px;
    grid-auto-rows: 60px;

    & > *:last-child {
        border: 0.5px solid #fcb13e;
    }

    button {
        border: 1px solid black;
        background: white;
        text-align: center;
        cursor: pointer;
    }
`;
export const ExceptionH3 = styled.button`
    border: 0.5px solid black !important;
    background: #ff9c04 !important;
`;