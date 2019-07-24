"use module"
import tape from "tape"

import { immediate, makeImmediate} from ".."

function *fixture(){
	yield 2
	yield 4
	yield 6
}

tape( "immediate()", async function( t){
	t.plan( 5)
	const
	  vals= immediate( fixture()),
	  expect= Array.from( fixture())

	const forAwait= (async function(){
		for await(let val of vals){
			t.equal( val, expect.shift(), "expected value")
		}
	})();
	
	t.equal( expect.length, 3, "nothing has run yet")
	await forAwait
	// TODO: this test only tests that some pausing on the main loop has happened,
	//  it'd be nice to test more thoroughly that each iteration is going dormant
	t.equal( expect.length, 0, "saw all expected")
	t.end()
})

tape( "makeImmediate()()", async function( t){
	t.plan( 5)
	const
	  vals= makeImmediate( fixture)(),
	  expect= Array.from( fixture())

	const forAwait= (async function(){
		for await(let val of vals){
			t.equal( val, expect.shift(), "expected value")
		}
	})();
	
	t.equal( expect.length, 3, "nothing has run yet")
	await forAwait
	// TODO: this test only tests that some pausing on the main loop has happened,
	//  it'd be nice to test more thoroughly that each iteration is going dormant
	t.equal( expect.length, 0, "saw all expected")
	t.end()

})
