import { StringCombinator } from '../../../../_utils/StringCombinator';

/**
 * 움직이는 사진 리스트
 * @param {Object[]}
 * @returns
 */
export default function SlidingPhotos({ photos }) {
    return (
        <div className='animationList flex w-[900rem] animate-infiniteslide select-none flex-row hover:[animation-play-state:paused]'>
            {photos.length === 0
                ? null
                : [...Array(2)].map((_, index) => (
                      <div key={index} className='imgList flex w-[450rem] flex-row items-center'>
                          {photos.map(photo => (
                              <div key={photo.id} className='cell inline-block h-fit w-[45rem] px-1'>
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
