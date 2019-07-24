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
		cursor= await iter.next()
		delay()
	}
	return cursor&& cursor.value
}
export {
	immediate as default,
	immediate as Immediate,
	immediate as asyncIterImmediate,
	immediate as AsyncIterImmediate
}
