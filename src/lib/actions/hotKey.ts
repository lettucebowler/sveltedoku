interface ShortActionParams {
	shift?: boolean;
	ctrl?: boolean;
	alt?: boolean;
	meta?: boolean;
	cb?: () => void;
	code?: string;
}

const Keys: Array<keyof ShortActionParams> = ['alt', 'code', 'ctrl', 'meta', 'shift'];

type ShortActionParamsWithoutCB = Exclude<keyof ShortActionParams, 'cb'>;

const KeysToEventMap: Record<ShortActionParamsWithoutCB, keyof KeyboardEvent> = {
	alt: 'altKey',
	meta: 'metaKey',
	ctrl: 'ctrlKey',
	shift: 'shiftKey',
	code: 'code'
};

const isUndefined: (a: any) => boolean = (a: any) => a === undefined;
export const hotKeyAction = (node: HTMLElement, params: ShortActionParams) => {
	let nodeHandler: (event: KeyboardEvent) => void;
	function destroy() {
		window.removeEventListener('keydown', nodeHandler);
	}
	function update(params: Partial<ShortActionParams>) {
		destroy();
		function handler(event: KeyboardEvent) {
			const definedKeys = Keys.filter(
				(key) => !isUndefined(params[key as keyof ShortActionParams])
			);
			const undefinedKeys = Keys.filter((key) =>
				isUndefined(params[key as keyof ShortActionParams])
			);

			function check(key: keyof ShortActionParams) {
				return (
					params[key] ===
					event[KeysToEventMap[key as ShortActionParamsWithoutCB] as keyof KeyboardEvent]
				);
			}

			if (
				definedKeys.every(check) &&
				!undefinedKeys.some((key) => !!event[KeysToEventMap[key as ShortActionParamsWithoutCB]])
			) {
				event.preventDefault();
				params.cb ? params.cb() : node.click();
			}
		}
		nodeHandler = handler;
		window.addEventListener('keydown', nodeHandler);
	}
	update(params);
	return {
		update,
		destroy
	};
};
