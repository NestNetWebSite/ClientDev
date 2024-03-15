import { StringCombinator } from '../../../../_utils/StringCombinator';
import { ISlidingPhoto } from '../../type';

interface IProps {
    photos: ISlidingPhoto[];
}

export default function SlidingPhotos({ photos }: IProps) {
    return (
        <div className='AnimationList inline-block w-[800rem] animate-infiniteslide select-none hover:[animation-play-state:paused]'>
            {photos.length === 0
                ? null
                : [...Array(2)].map((_, index) => (
                      <div key={index} className='inline-block w-[400rem]'>
                          {photos.map((photo, idx) => (
                              <div key={idx} className='ImageCell inline-block h-fit w-[20rem] px-2'>
                                  <img
                                      className='brightness-98 rounded-sm shadow-md'
                                      src={StringCombinator.getImageURL(photo.saveFilePath, photo.saveFileName)}
                                      alt={'포토존 사진'}
                                  />
                              </div>
                          ))}
                      </div>
                  ))}
        </div>
    );
}
