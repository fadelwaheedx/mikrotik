<?php

declare(strict_types=1);

namespace App\Filament\Resources;

use App\Filament\Resources\ToolResource\Pages;
use App\Models\Tool;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\Builder;

class ToolResource extends Resource
{
    protected static ?string $model = Tool::class;

    protected static ?string $navigationIcon = 'heroicon-o-wrench-screwdriver';

    protected static ?string $navigationGroup = 'Tool Management';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn (Forms\Set $set, ?string $state) => $set('slug', \Illuminate\Support\Str::slug($state ?? ''))),

                Forms\Components\TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true),

                Forms\Components\Section::make('Visual Form Builder')
                    ->description('Drag and drop blocks to build the tool interface.')
                    ->schema([
                        Builder::make('form_schema')
                            ->blocks([
                                Builder\Block::make('text_input')
                                    ->schema([
                                        Forms\Components\TextInput::make('label')->required(),
                                        Forms\Components\TextInput::make('variable')->required()->prefix('{{')->suffix('}}'),
                                        Forms\Components\TextInput::make('placeholder'),
                                        Forms\Components\TextInput::make('regex')->label('Regex Validation'),
                                        Forms\Components\TextInput::make('helper_text'),
                                    ]),
                                Builder\Block::make('select_input')
                                    ->schema([
                                        Forms\Components\TextInput::make('label')->required(),
                                        Forms\Components\TextInput::make('variable')->required()->prefix('{{')->suffix('}}'),
                                        Forms\Components\Repeater::make('options')
                                            ->schema([
                                                Forms\Components\TextInput::make('label')->required(),
                                                Forms\Components\TextInput::make('value')->required(),
                                            ])
                                            ->columns(2),
                                    ]),
                                Builder\Block::make('switch_input')
                                    ->schema([
                                        Forms\Components\TextInput::make('label')->required(),
                                        Forms\Components\TextInput::make('variable')->required()->prefix('{{')->suffix('}}'),
                                        Forms\Components\Toggle::make('default_state'),
                                    ]),
                                Builder\Block::make('ip_input')
                                    ->schema([
                                        Forms\Components\TextInput::make('label')->required(),
                                        Forms\Components\TextInput::make('variable')->required()->prefix('{{')->suffix('}}'),
                                        Forms\Components\Toggle::make('cidr_allowed')->label('Allow CIDR'),
                                    ]),
                                Builder\Block::make('section_group')
                                    ->schema([
                                        Forms\Components\TextInput::make('title')->required(),
                                        Forms\Components\Placeholder::make('separator')->content('--- Section Separator ---'),
                                    ]),
                            ])
                            ->reorderable()
                            ->cloneable()
                            ->collapsible()
                    ]),

                Forms\Components\Section::make('Script Template')
                    ->schema([
                        Forms\Components\Textarea::make('script_template')
                            ->label('RouterOS Script Template')
                            ->rows(10)
                            ->helperText('Use {{variable}} syntax corresponding to the blocks above.')
                            ->required(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->searchable(),
                Tables\Columns\TextColumn::make('slug'),
                Tables\Columns\TextColumn::make('updated_at')->dateTime(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTools::route('/'),
            'create' => Pages\CreateTool::route('/create'),
            'edit' => Pages\EditTool::route('/{record}/edit'),
        ];
    }
}
