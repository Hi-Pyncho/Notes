# enums

```ts
enum Membership {
  Basic,
  Standart,
  Premium
}

const membership = Membership.Standart;
const membershipReverse = Membership[2];
console.log(membership) //1
console.log(membershipReverse) //Premium

enum SocialMedia {
  VK = 'vkontakte',
  FACEBOOK = 'Facebook',
  INSTAGRAM = 'instagram'
}

const social = SocialMedia.INSTAGRAM;
console.log(social);// instagram
```
