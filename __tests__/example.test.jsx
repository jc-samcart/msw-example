import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'
import {createNewBanana, createNewBananaWithData} from "../app/example";
import {http, HttpResponse} from "msw";
import {setupServer} from "msw/node";


const server = setupServer(
    http.post('https://localhost:2345/bananas', ({ request, params, cookies }) => {
        return HttpResponse.json({age: 7})
    }),
)

beforeAll(() => {
    server.listen()
})

afterEach(() => {
    // This will remove any runtime request handlers
    // after each test, ensuring isolated network behavior.
    server.resetHandlers()
})

afterAll(() => {
    server.close()
})

describe('Banana', () => {

    it('posts a new banana with mocked age', async () => {

        const data = await createNewBanana()

        expect(data.age).toEqual(7)
    })


    it('posts a new banana and ignores the provided age', async () => {

        const data = await createNewBananaWithData(8)

        expect(data.age).toEqual(7)
    })
})
