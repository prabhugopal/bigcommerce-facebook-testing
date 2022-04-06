describe('Facebook Connect', () => {

    const storeUrl = Cypress.env('STORE_BASE_URL')
    const adminUri = '/admin/staff'

    
    
    before(() => {
        const user = {
            name: Cypress.env('OKTA_USERNAME'),
            password: Cypress.env('OKTA_PASSWORD')
        }
        
        cy.visit(storeUrl + adminUri)

        cy.url().then($url => {
            if($url.includes('login')){
                cy.get('input[name="username"]').type(user.name)
                cy.get('input[name="password"]').type(user.password)
                cy.get('#okta-signin-submit').click()
                cy.url().should('contains', 'push')
                cy.contains('Send Push').click()
                cy.wait(5000)
            }
        })

        cy.visit(storeUrl + '/manage/channels/facebook/about')

    });
    



    it('it should connect facebook', () => {
        cy.get('#content-iframe').then(($iframe) => {
        cy.wait(5000)    
        cy.get('#content-iframe')
        .its('0.contentDocument').should('exist')
        .its('body').should('not.be.undefined')//.then(cy.wrap)




        let res;
        cy
        .request('GET', '/admin/services/facebook-commerce/v3/stores/15560609/fbe/initiate?ig_checkout=false&is_facebook_capi_enabled=true&unified_onboarding=true')
        .then( ({ body }) => {
            console.log(body.data)
            const urls = body.data.split("&redirect_uri=")

            cy.forceVisit(body.data)
            /*cy.window().then(win => {
                cy.stub(win, 'open').as('windowOpen')
            });

            cy.get('@windowOpen').then(stub => {
                stub.top.location.href = body.data
            }); */
            //cy.forceVisit("https://www.facebook.com/dialog/oauth?client_id=483365901841566&redirect_uri=https%3A%2F%2F3p-auth.integration.zone%2Fomni%2Ffacebook&response_type=code&display=page&scope=manage_pages%2Cpublish_pages%2Cbusiness_management%2Cads_management%2Cinstagram_basic%2Cmanage_business_extension&extras=%7B%22business_config%22%3A%7B%22business%22%3A%7B%22name%22%3A%22Test%20Store%22%7D%7D%2C%22repeat%22%3Afalse%2C%22setup%22%3A%7B%22business_vertical%22%3A%22ECOMMERCE%22%2C%22channel%22%3A%22COMMERCE%22%2C%22currency%22%3A%22USD%22%2C%22domain%22%3A%22test-store-y4.my-integration.zone%22%2C%22external_business_id%22%3A%2215560609-1%22%2C%22timezone%22%3A%22America%2FNew_York%22%7D%7D&state=n_To2r18G1r1IEDPINASjw")
            //cy.forceVisit("https://www.facebook.com/dialog/oauth?client_id=483365901841566&redirect_uri=https%3A%2F%2F3p-auth.integration.zone%2Fomni%2Ffacebook&response_type=code&display=page&scope=manage_pages%2Cpublish_pages%2Cbusiness_management%2Cads_management%2Cinstagram_basic%2Cmanage_business_extension&extras=%7B%22business_config%22%3A%7B%22business%22%3A%7B%22name%22%3A%22Test%20Store%22%7D%7D%2C%22repeat%22%3Afalse%2C%22setup%22%3A%7B%22business_vertical%22%3A%22ECOMMERCE%22%2C%22channel%22%3A%22COMMERCE%22%2C%22currency%22%3A%22USD%22%2C%22domain%22%3A%22test-store-y4.my-integration.zone%22%2C%22external_business_id%22%3A%2215560609-1%22%2C%22timezone%22%3A%22America%2FNew_York%22%7D%7D&state=n_To2r18G1r1IEDPINASjw");
            //cy.window().then(win => win.parent.top.location.href = body.data);

        })


        cy.contains('Reload').click( () => {
            cy.contains('Continue as .*', {timeout: 5000})
        })

        //cy.contains('Reload').click()
        cy.wait(5000).contains(/Continue.*$/, {timeout: 5000}).then(($elem) => {
            const txt = new RegExp($elem.text().replace("?", "") + "$")
            console.log(txt)
            cy.contains(txt).click()
        })


        cy.wait(1000).contains(/Facebook ads/).click()
        cy.wait(1000).contains(/Instagram Shopping/).click()
        cy.wait(1000).contains(/Get started/).click()
        cy.wait(1000).get('.gs1a9yip > :nth-child(1) > .j83agx80 > :nth-child(1) > .d2edcug0').click()
        cy.wait(1000).contains(/Continue/).click()
        cy.wait(1000).get('.gs1a9yip > :nth-child(1) > .j83agx80 > :nth-child(1) > .d2edcug0').click()
        cy.wait(1000).contains(/Continue/).click()
        cy.wait(1000).get('.gs1a9yip > :nth-child(1) > .j83agx80 > :nth-child(1) > .d2edcug0').click()
        cy.wait(1000).contains(/Continue/).click()
        cy.wait(1000).get('.gs1a9yip > :nth-child(1) > .j83agx80 > :nth-child(1) > .d2edcug0').click()
        cy.wait(1000).contains(/Continue/).click()
        cy.wait(2000).contains(/Continue/).click()
        cy.wait(5000).get('.okxdybxi > .oajrlxb2 > .owycx6da').contains(/Continue/).click()
        cy.wait(1000).contains(/Next/).click()
        cy.wait(5000).contains(/Finish/).click()

        cy.wait(5000).contains('Reload Page').click();

        //cy.wait(5000).visit(storeUrl + '/admin/staff')

        //


        

    });
        /*cy.get('#content-iframe').its('0.contentDocument') .should('exist')
        .its('body').should('not.be.undefined').then(
            cy.wrap).get('main').then(($main) => {
                $main.find('button')//.should('exist')
            })*/ //.find('button').should('exist')
        /*.within( ($main) => {
            cy.get('input[type="button"]').should('exist')
        })*/
        //.its('children').find('button').should('exist')  //.get('input[type="button]').click();
    });

});
