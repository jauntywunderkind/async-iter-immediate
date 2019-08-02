"use module"
import PImmediate from "p-immediate"

function getIter( inp/*ut stream*/){
	return inp[ Symbol.asyncIterator]? inp[ Symbol.asyncIterator](): inp[ Symbol.iterator]()
}

export async function* immediate( inp, delay= PImmediate){
	const iter= getIter( inp)
	let cursor= await iter.next()
	while( cursor&& !cursor.done){
		yield cursor.value;
		cursor= iter.next()
		delay()
		cursor= await cursor
	}
	return cursor&& cursor.value
}
export {
	immediate as default,
	immediate as Immediate,
	immediate as asyncIterImmediate,
	immediate as AsyncIterImmediate
}

export function makeImmediate( makeIterator){
	return async function *( delay= PImmediate){
		yield* immediate( makeIterator(), delay)
	}
}
export {
	makeImmediate as MakeImmediate
}
