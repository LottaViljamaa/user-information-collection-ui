*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}      http://localhost:4200
${BROWSER}  chrome

*** Test Cases ***
Open Angular App and Verify Title
    Open Browser    ${URL}    ${BROWSER}
    Title Should Be    Collection
    Close Browser
