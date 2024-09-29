export const t= {
    headers: {
        mainHeader: 'Henkilötietosovellus',
        addInformation: 'Lisää uusi henkilötieto',
        deleteInformation: 'Poista henkilötieto',
        editInformation: 'Muokkaa henkilön tietoja',
        showInformation: 'Näytä henkilön tiedot',
        usersInformation: 'Kaikkien henkilöiden tiedot',
        additionalHeaders: {
            deleteInformation: 'Syötä sen henkilön henkilötunnus, jonka tiedot haluat poistaa.',
            editInformation: 'Syötä sen henkilön henkilötunnus, jonka tietoja haluat muokata.',
            showInformation: 'Syötä sen henkilön henkilötunnus, jonka tietoja haluat tarkastella.',
            allInformation: 'Henkilötietoja yhteensä: ',
            chooseGender: 'Valitse sukupuoli',
            totalUsers: 'Henkilötietoja yhteensä: {amount} kpl.'
        }
    },
    userInformation: {
        firstName: 'Etunimi: ',
        lastName: 'Sukunimi: ',
        personalIdentityCode: 'Henkilötunnus: ',
        citizenship: 'Kansalaisuus: ',
        gender: 'Sukupuoli: ',
        genderMan: 'Mies',
        genderWoman: 'Nainen',
        genderOther: 'Muu',
        email: 'Sähköpostiosoite: ',
        phoneNumber: 'Puhelinnumero: ',
        streetAddress: 'Katuosoite: ',
        city: 'Kaupunki: ',
        postalCode: 'Postinumero: '
    },
    errorMessages: {
        sendError: 'Tietojen lisäys epäonnistui:',
        deleteError: 'Tietojen poistamisessa tapahtui virhe',
        editErro: 'Tietojen päivitys epäonnistui.',
        searchErro: 'Tietojen haussa tapahtui virhe',
        personalIdentityCodeExists: "annettu henkilötunnus on jo käytössä.",
        mandatory: ' tieto on pakollinen.',
        nameForm: ' syöte voi sisältää vain kirjaimia ja väliviivan.',
        identityCodeForm: ' tieto täytyy olla muodossa: 000000-0000.',
        lettersOnly: ' kenttä voi sisältää vain kirjaimia.',
        emailForm: ' syötä kelvollinen sähköpostiosoite',
        phoneNumberForm: ' kenttä voi sisältää vain numeroita ja "+" -merkin.',
        inputTooLong: ' syöte ei voi olla yli 20 merkkiä pitkä.',
        inputLength: ' syötteen täytyy olla täsmälleen 5 numeroa pitkä.',
        idNotFound: 'Annetulla henkilötunnuksella ei löydy tietoja.',
        noInformationFound: "Henkilötietoja ei saatavilla."
    },
    successMessages: {
        success: 'Tietojen lähetys onnistui.',
        deleteSuccess: 'Henkilötiedot poistettu onnistuneesti henkilötunnuksella {id}.',
        editSuccess: 'Tietojen päivitys onnistui'
    },
    cancelMessages: {
        cancel: 'Tietojen poisto peruutettu.',
    },
    confirmationMessage: {
        delete: 'Haluatko varmasti poistaa henkilötiedot henkilötunnuksella: {id}?'
    },
    button: {
        send: 'Lähetä',
        save: 'Tallenna muutokset',
        delete: 'Poista',
        search: 'Hae tiedot'
    },
    navigation: {
        add: 'Lisää',
        edit: 'Muokkaa',
        delete: 'Poista',
        showInformations: 'Näytä henkilötiedot',
        showInformation: 'Näytä henkilön tiedot'
    }
  };