import { StringCombinator } from '../../../../_utils/StringCombinator';

/**
 * 움직이는 사진 리스트
 * @param {Object[]}
 * @returns
 */
export default function SlidingPhotos({ photos }) {
    return (
        <div className='AnimationList inline-block w-[400rem] animate-infiniteslide select-none hover:[animation-play-state:paused]'>
            {photos.length === 0
                ? null
                : [...Array(2)].map((_, index) => (
                      <div key={index} className='inline-block w-[200rem]'>
                          {photos.map(photo => (
                              <div key={photo.id} className='ImageCell inline-block h-fit w-[20rem] px-2'>
                                  <img
                                      className='brightness-98 rounded-sm shadow-md'
                                      src={StringCombinator.getImageURL(photo)}
                                      alt={'포토존 사진'}
                                  />
                              </div>
                          ))}
                      </div>
                  ))}
        </div>
    );
}
