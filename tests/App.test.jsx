import { it, expect, describe, beforeAll } from 'vitest'
import { waitFor } from '@testing-library/react'
import ReactThreeTestRenderer from '@react-three/test-renderer'
import App from 'src/App'

describe('Caption', () => {
    it('should render App', async () => {
        const renderer = await ReactThreeTestRenderer.create(<App />)

        // I use this waitFor to wait until the component is completely done loading. 
        // In the future, I should have something for waiting for the culprit texture to load
        // or pass the texture as a prop.  
        await waitFor(() => expect(renderer.scene.children[0].allChildren).toBeDefined())
        const meshChildren = renderer.scene.children[0].allChildren
        expect(meshChildren.length).toBeGreaterThan(0)
    })

})
