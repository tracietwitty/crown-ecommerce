import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// found on firebase application settings under "Firebase SDK snippet"
const config = {
	apiKey: 'AIzaSyDXzMZbQVsHAPRAbVQQaIK1HURpK5OSIKM',
	authDomain: 'crown-db-8d5df.firebaseapp.com',
	databaseURL: 'https://crown-db-8d5df.firebaseio.com',
	projectId: 'crown-db-8d5df',
	storageBucket: 'crown-db-8d5df.appspot.com',
	messagingSenderId: '129888657812',
	appId: '1:129888657812:web:81aa31eb99f3c5c5d8ef81',
	measurementId: 'G-ZMJ1Q93N27'
};

firebase.initializeApp(config);

//take UID off object and store it in db:
export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	//if user exists, query firestore and get object (DocumentReference) back:
	const userRef = firestore.doc(`users/${userAuth.uid}`);
	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		//create data using userRef
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			});
		} catch (error) {
			console.log('Error creating user: ', error.message);
		}
	}

	return userRef;
};

export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	const collectionRef = firestore.collection(collectionKey);
	console.log(collectionRef);

	const batch = firestore.batch();
	objectsToAdd.forEach(obj => {
		const newDocRef = collectionRef.doc();
		batch.set(newDocRef, obj);
	});

	return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
	const transformedCollection = collections.docs.map(doc => {
		const { title, items } = doc.data();

		return {
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items
		};
	});

	return transformedCollection.reduce((accumulator, collection) => {
		accumulator[collection.title.toLowerCase()] = collection;
		return accumulator;
	}, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// google auth utility
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

// google sign-in pop-up
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
